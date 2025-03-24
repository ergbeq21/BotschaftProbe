<script lang="ts">
	let email: string = '';
	let successMessage: string = '';
	let errorMessage: string = '';
	let isLoading: boolean = false;

	const handleSubmit = async () => {
		isLoading = true;
		successMessage = '';
		errorMessage = '';

		try {
			const response = await fetch('/sendEmail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (response.ok) {
				successMessage = data.success;
			} else {
				errorMessage = data.error || 'Unknown error';
			}
		} catch (err) {
			errorMessage =
				'Error sending email: ' + (err instanceof Error ? err.message : 'Unknown error');
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-xl">
		<h2 class="mb-6 text-center text-3xl font-bold text-blue-600">Send Email</h2>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-4">
				<input
					type="email"
					placeholder="Enter your email"
					bind:value={email}
					required
					class="w-full rounded-lg border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				class="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-400"
			>
				{#if isLoading}
					Sending...
				{:else}
					Send Email
				{/if}
			</button>
		</form>

		{#if successMessage}
			<p class="mt-4 font-medium text-green-600">{successMessage}</p>
		{/if}

		{#if errorMessage}
			<p class="mt-4 font-medium text-red-600">{errorMessage}</p>
		{/if}

		<a href="/admin/users" class="mt-6 block text-center text-blue-600 hover:underline"
			>Go back to Users</a
		>
	</div>
</div>
