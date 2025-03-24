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
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-6">
	<div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
	  
	  <!-- Go back to users link -->
	  <a href="/users" class="text-blue-600 hover:underline text-sm mb-4 inline-block">
		Go back to users
	  </a>
	  
	  <!-- Button to send emails -->
	  <button
		on:click={sendEmails}
		disabled={loading}
		class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 transition duration-300 transform hover:scale-105"
	  >
		{#if loading}
		  Sending...
		{:else}
		  Send Emails
		{/if}
	  </button>
  
	  <!-- Message display -->
	  {#if message}
		<p class="mt-6 text-lg font-semibold text-gray-800">
		  {message}
		</p>
	  {/if}
	</div>
  </div>
  