<script lang="ts">
    import type  { QrcodeSuccessCallback, QrcodeErrorCallback } from "html5-qrcode";
    import   { Html5Qrcode} from "html5-qrcode";
    import { onMount } from "svelte";

    let scanning: boolean = false;
    let html5Qrcode: Html5Qrcode | null = null;
    let result: string = "";

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
    const onScanSuccess: QrcodeSuccessCallback = (decodedText, decodedResult) => {
        console.log(decodedResult);
        result = decodedText;
        stop();
    };

    // Failure callback
    const onScanFailure: QrcodeErrorCallback = (error) => {
        console.warn(`Code scan error = ${error}`);
    };
</script>

<div id="reader"></div>

<button onclick={start} disabled={scanning}>Start Scanning</button>
<button onclick={stop} disabled={!scanning}>Stop Scanning</button>

<p>Scan Result: {result}</p>
