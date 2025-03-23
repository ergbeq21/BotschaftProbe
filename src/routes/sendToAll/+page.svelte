<script lang="ts">
	let loading = false;
	let message = '';

	async function sendEmails() {
		loading = true;
		message = '';

		try {
			const response = await fetch('/sendToAll', {
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

<button on:click={sendEmails} disabled={loading} class="send-button">
	{#if loading}
		Sending...
	{:else}
		Send Emails
	{/if}
</button>

<p>{message}</p>

<style>
	.send-button {
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
	}

	.send-button:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}
</style>
