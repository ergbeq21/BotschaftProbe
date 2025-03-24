<script lang="ts">
    import type { QrcodeSuccessCallback, QrcodeErrorCallback } from "html5-qrcode";
    import { Html5Qrcode } from "html5-qrcode";
    import { onMount } from "svelte";

    let scanning: boolean = false;
    let html5Qrcode: Html5Qrcode | null = null;
    let result: string = "";
    let userMessage: string = "";

    onMount(init);

    function init(): void {
        html5Qrcode = new Html5Qrcode("reader");
    }

    async function start(): Promise<void> {
        if (!html5Qrcode) return;

        await html5Qrcode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
        );

        scanning = true;
    }

    async function stop(): Promise<void> {
        if (html5Qrcode) {
            await html5Qrcode.stop();
        }
        scanning = false;
    }

    // Success callback
    const onScanSuccess: QrcodeSuccessCallback = async (decodedText, decodedResult) => {
        console.log(decodedResult);
        result = decodedText;
        
        // Call the API to check if the user exists
        await checkUserInDatabase(result);
        
        stop();
    };

    // Failure callback
    const onScanFailure: QrcodeErrorCallback = (error) => {
        console.warn(`Code scan error = ${error}`);
    };
    async function checkUserInDatabase(name: string) {
        try {
            const response = await fetch("/camera", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            });

            const data = await response.json();
            if (data.success) {
                userMessage = `User found: ${data.user.vorname}`;
            } else {
                userMessage = "User not found";
            }
        } catch (error) {
            console.error("Error checking user:", error);
            userMessage = "An error occurred while checking the database.";
        }
    }
</script>

<div id="reader"></div>

<button on:click={start} disabled={scanning}>Start Scanning</button>
<button on:click={stop} disabled={!scanning}>Stop Scanning</button>

<p>Scan Result: {result}</p>

<p>{userMessage}</p>
