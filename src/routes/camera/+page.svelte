<script lang="ts">

    import type { QrcodeSuccessCallback, QrcodeErrorCallback } from "html5-qrcode";
    import { Html5Qrcode } from "html5-qrcode";
    import { onMount } from "svelte";

    let scanning: boolean = false;
    let html5Qrcode: Html5Qrcode | null = null;
    let result: string = "";
    let userExists: boolean | null = null;
    let userMessage: string = "";


	onMount(init);

	function init(): void {
		html5Qrcode = new Html5Qrcode('reader');
	}

	async function start(): Promise<void> {
		if (!html5Qrcode) return;

        await html5Qrcode.start(
            { facingMode: "environment" },
            {
                fps: 30,
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
    const onScanSuccess: QrcodeSuccessCallback = async (decodedText) => {
        console.log("Scanned:", decodedText);
        result = decodedText;
        await checkUserInDatabase(result);
        stop();
    };

    // Failure callback
    const onScanFailure: QrcodeErrorCallback = (error) => {
        console.warn(`Code scan error = ${error}`);
    };

    // Function to check the scanned name in the database
    async function checkUserInDatabase(name: string) {
        try {
            const response = await fetch("/api/check-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            });

            const data = await response.json();
            userExists = data.success;
            userMessage = data.message;
        } catch (error) {
            console.error("Error checking user:", error);
            userMessage = "An error occurred while checking the database.";
        }
    }

</script>

<div id="reader"></div>

<button onclick={start} disabled={scanning}>Start Scanning</button>
<button onclick={stop} disabled={!scanning}>Stop Scanning</button>

{#if userExists === true}
    <p class="text-green-600">✅ {userMessage}</p>
{:else if userExists === false}
    <p class="text-red-600">❌ {userMessage}</p>
{/if}
