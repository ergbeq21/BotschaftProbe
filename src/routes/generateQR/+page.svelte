<script lang="ts">
    import { enhance } from "$app/forms";
    export let form: { qrCode?: string; message?: string } = {};
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 class="text-2xl font-semibold text-gray-800 text-center mb-4">QR-Code Generator</h1>

        <form action="?/getUserName" method="POST" use:enhance class="space-y-4">
            <input 
                type="text" 
                name="inputValue" 
                placeholder="Enter Name" 
                class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
            <button 
                type="submit" 
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all">
                Generate QR Code
            </button>
        </form>

        {#if form?.message}
            <p class="text-center text-red-500 mt-4">{form.message}</p>
        {/if}

        {#if form?.qrCode}
            <div class="flex justify-center mt-6">
                <img src="{form.qrCode}" alt="Generated QR Code" class="rounded-lg shadow-md border p-2">
            </div>
        {/if}
    </div>
</div>
