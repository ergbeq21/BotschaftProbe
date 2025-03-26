<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();
	let loading: boolean = $state(true);

	// When data is ready, mark loading as false
	$effect(() => {
		if (data) {
			loading = false;
		}
	});

	const goToAdminPage = () => {
		if (!data.user) {
			goto('/admin/login');
		} else {
			goto('/admin/users');
		}
	};
</script>

<main class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 px-4 py-12">
	<div class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl bg-white p-6 sm:p-8 text-center shadow-xl">
		{#if loading}
			<h1 class="mb-4 text-2xl sm:text-3xl font-semibold text-gray-800">Loading...</h1>
			<p class="mb-4 text-base sm:text-lg text-gray-600">Please wait while the page loads.</p>
		{:else}
			{#if data.user}
				<h1 class="mb-4 text-2xl sm:text-3xl font-semibold text-gray-800">
					Welcome back, {data.user.username}!
				</h1>
				<p class="mb-6 text-base sm:text-lg text-gray-600">You are logged in as {data.user.role}.</p>
			{:else}
				<h1 class="mb-4 text-3xl font-semibold text-gray-800">You are not logged in.</h1>
				<p class="mb-4 text-lg text-gray-600">To access the admin page, please log in.</p>
				<a
					href="/admin/login"
					class="font-semibold text-blue-600 transition duration-300 hover:text-blue-700">Login</a
				>
			{/if}

			<div class="mt-8">
				<!-- svelte-ignore event_directive_deprecated -->
				<button
					onclick={goToAdminPage}
					class="w-full rounded-lg bg-blue-600 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					Go to Admin Page
				</button>
			</div>
		{/if}
	</div>
</main>
