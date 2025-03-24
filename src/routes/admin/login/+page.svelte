<script>
	import { enhance } from '$app/forms';
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 px-4"
>
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
	>
		<h1 class="mb-6 text-center text-3xl font-extrabold text-gray-800">Login</h1>

		<div class="mb-4">
			<label for="email" class="mb-1 block font-medium text-gray-700">E-Mail</label>
			<input
				type="text"
				name="email"
				id="email"
				required
				class="w-full rounded-lg border border-gray-300 p-3 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>

		<div class="mb-6">
			<label for="password" class="mb-1 block font-medium text-gray-700">Password</label>
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
			class="w-full rounded-lg bg-green-500 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-green-600"
		>
			Login
		</button>
	</form>
</div>
