<script>
	export let data;
</script>

<main class="flex min-h-screen flex-col items-center bg-gray-100 py-12">
	<h1 class="mb-8 text-center text-4xl font-extrabold text-blue-900">Alle Events</h1>

	<a
		href="/admin/users"
		class="mb-4 text-lg text-blue-600 transition duration-300 hover:text-blue-800"
	>
		Go Back to Users
	</a>

	<a
		href="/admin/events/newEvent"
		class="mb-8 rounded-full bg-blue-600 px-6 py-3 text-lg text-white shadow-xl transition duration-300 hover:bg-blue-700"
	>
		Add a new event
	</a>

	<div class="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
		<ul class="space-y-6">
			{#each data.events as event}
				<li
					class="flex items-center justify-between border-b border-gray-300 p-4 transition duration-200 hover:bg-gray-50"
				>
					<div class="text-lg font-medium text-gray-800">
						{event.event_id}: {event.event_name}
					</div>
				</li>

				<form method="POST" action="?/deleteEvent" class="mt-6">
					<input type="hidden" name="event_id" value={event.event_id} />
					<button
						type="submit"
						class="w-full rounded-lg bg-red-600 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
					>
						Event löschen
					</button>
				</form>
			{/each}
		</ul>
	</div>
</main>
