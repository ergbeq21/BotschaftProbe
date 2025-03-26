<script lang="ts">
	import { enhance } from '$app/forms';
	export let form: { qrCode?: string; message?: string } = {};
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
	<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
		<h1 class="mb-4 text-center text-2xl font-semibold text-gray-800">QR-Code Generator</h1>

		<form action="?/getUserName" method="POST" use:enhance class="space-y-4">
			<input
				type="text"
				name="inputValue"
				placeholder="Enter Name"
				class="w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
			<button
				type="submit"
				class="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600"
			>
				Generate QR Code
			</button>
		</form>

		{#if form?.message}
			<p class="mt-4 text-center text-red-500">{form.message}</p>
		{/if}

		{#if form?.qrCode}
			<div class="mt-6 flex justify-center">
				<img src={form.qrCode} alt="Generated QR Code" class="rounded-lg border p-2 shadow-md" />
			</div>
		{/if}
	</div>
</div>
