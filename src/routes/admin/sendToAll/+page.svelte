<script lang="ts">
	let loading = false;
	let message = '';

	async function sendEmails() {
		loading = true;
		message = '';

		try {
			const response = await fetch('/admin/sendToAll', {
				method: 'POST'
			});
			const data = await response.json();

			message = data.message;
		} catch (error) {
			console.error('Error:', error);
			message = 'Failed to send emails.';
		} finally {
			loading = false;
		}
	}
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-6"
>
	<div class="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">

		<a href="/users" class="mb-4 inline-block text-sm text-blue-600 hover:underline">
			Go back to users
		</a>


		<button
			on:click={sendEmails}
			disabled={loading}
			class="w-full transform rounded-lg bg-blue-600 py-3 text-white transition duration-300 hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-300"
		>
			{#if loading}
				Sending...
			{:else}
				Send Emails
			{/if}
		</button>


		{#if message}
			<p class="mt-6 text-lg font-semibold text-gray-800">
				{message}
			</p>
		{/if}
	</div>
</div>
