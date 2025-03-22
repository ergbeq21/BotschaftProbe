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

<<<<<<< HEAD
<main class="flex items-center justify-center p-10">
	<a href="/users" class="text-blue-600">Go to Admin Page</a>
=======
<div>
    {#if data.user}
        <p>Welcome back, {data.user.username}</p>
    {:else}
        <p>You are not logged in.</p>
        <p>
            <a href="/login">Login</a>
        </p>
    {/if}
</div>

<main class="flex items-center justify-center p-10">
    <button on:click={goToAdminPage} class="text-blue-600">
        Go to Admin Page
    </button>
>>>>>>> origin/alternative-universe
</main>
