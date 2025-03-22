<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
	>
		<h1 class="mb-4 text-2xl font-bold text-gray-800">Login</h1>

		<label for="email" class="block text-gray-700">E-Mail</label>
		<input
			type="text"
			name="email"
			id="email"
			required
			class="mb-4 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>

		<label for="password" class="block text-gray-700">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			required
			class="mb-4 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>

		<button type="submit" class="w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600"
			>Login</button
		>
	</form>
</div>
