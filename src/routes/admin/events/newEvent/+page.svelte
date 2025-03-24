<script>
	let { data } = $props();
</script>

<h1 class="mb-6 p-10 text-center text-4xl font-bold text-[#044dca]">Füge eine Neue Event</h1>

<div class="container mx-auto">
	<form
		method="POST"
		action="?/addNewEvent"
		class="mx-auto flex max-w-lg flex-col rounded-lg bg-white p-8 shadow-lg"
	>
		<textarea
			name="name"
			placeholder="Event Name"
			class="mb-4 min-h-[120px] rounded-md border border-gray-300 p-3 text-lg"
		></textarea>
		<button
			type="submit"
			class="cursor-pointer rounded-md bg-[#0088a9] px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-[#00788c]"
		>
			Füge Event
		</button>
	</form>
</div>
