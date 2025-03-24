<script lang="ts">
    let userResponse: string = ''; // Store the user's response (Yes or No)
    
    const handleResponse = (response: string) => {
        userResponse = response;
    };
</script>

<main class="p-6">
    <div>
        <h1 class="text-2xl font-bold mb-4 text-center">Would you like to accept our invitation?</h1>
        <div class="flex justify-center space-x-4">
            <button
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                on:click={() => handleResponse('yes')}
            >
                Yes
            </button>
            <button
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                on:click={() => handleResponse('no')}
            >
                No
            </button>
        </div>

        {#if userResponse === 'yes'}
            <h2 class="text-green-700 mt-6 text-center">Thank you very much for accepting our invitation!</h2>
        {:else if userResponse === 'no'}
            <h2 class="text-gray-600 mt-6 text-center">No problem, thank you for your response!</h2>
        {/if}
    </div>
</main>

<style>
    /* Additional styling for buttons and layout */
    button {
        transition: background-color 0.3s;
    }
</style>
