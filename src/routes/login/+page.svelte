<script>
	import { enhance } from '$app/forms';

</script>

<div class="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 px-4">
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
	>
		<h1 class="mb-6 text-3xl font-extrabold text-gray-800 text-center">Login</h1>

		<div class="mb-4">
			<label for="email" class="block text-gray-700 font-medium mb-1">E-Mail</label>
			<input
				type="text"
				name="email"
				id="email"
				required
				class="w-full rounded-lg border border-gray-300 p-3 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>

		<div class="mb-6">
			<label for="password" class="block text-gray-700 font-medium mb-1">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				class="w-full rounded-lg border border-gray-300 p-3 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>

		<button
			type="submit"
			class="w-full rounded-lg bg-green-500 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-green-600 shadow-md"
		>
			Login
		</button>

	</form>
</div>
