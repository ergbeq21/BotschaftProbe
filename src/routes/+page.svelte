<script lang="ts">
    import type { PageProps } from './$types';
    import { goto } from '$app/navigation';

    let { data }: PageProps = $props();

    const goToAdminPage = () => {
        if (!data.user) {
            goto('/login');
        } else {
            goto('/users');
        }
    };
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 py-12">
    <div class="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full text-center">
        {#if data.user}
            <h1 class="text-3xl font-semibold text-gray-800 mb-4">Welcome back, {data.user.username}!</h1>
            <p class="text-lg text-gray-600 mb-6">You are logged in as an admin.</p>
        {:else}
            <h1 class="text-3xl font-semibold text-gray-800 mb-4">You are not logged in.</h1>
            <p class="text-lg text-gray-600 mb-4">To access the admin page, please log in.</p>
            <a href="/login" class="text-blue-600 font-semibold hover:text-blue-700 transition duration-300">Login</a>
        {/if}

        <div class="mt-8">
            <!-- svelte-ignore event_directive_deprecated -->
            <button 
                on:click={goToAdminPage} 
                class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Go to Admin Page
            </button>
        </div>
    </div>
</main>
