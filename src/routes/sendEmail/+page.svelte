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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          successMessage = data.success;
        } else {
          errorMessage = data.error || 'Unknown error';
        }
      } catch (err) {
        errorMessage = 'Error sending email: ' + (err instanceof Error ? err.message : 'Unknown error');
      } finally {
        isLoading = false; 
      }
    };
  </script>
  
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 class="text-3xl font-bold text-center text-blue-600 mb-6">Send Email</h2>
  
      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            bind:value={email}
            required
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <button
          type="submit"
          disabled={isLoading}
          class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {#if isLoading}
            Sending...
          {:else}
            Send Email
          {/if}
        </button>
      </form>
  
      {#if successMessage}
        <p class="mt-4 text-green-600 font-medium">{successMessage}</p>
      {/if}
  
      {#if errorMessage}
        <p class="mt-4 text-red-600 font-medium">{errorMessage}</p>
      {/if}
  
      <a href="/users" class="block mt-6 text-center text-blue-600 hover:underline">Go back to Users</a>
    </div>
  </div>
  