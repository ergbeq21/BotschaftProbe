<script>
	// @ts-nocheck
	export let data;
	export let form;
	console.log(data?.users);
</script>

<main class="min-h-screen bg-gray-100 p-8">
	<h1 class="mb-12 text-center text-4xl font-extrabold text-[#2a2b55]">
		Übersicht von allen Besuchern
	</h1>

	<div class="mb-12 flex flex-wrap justify-center gap-6">
		<a
			href="/admin/users/new"
			class="transform rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			Füge einen Besucher hinzu
		</a>

		<form
			method="POST"
			action="?/searchByName"
			class="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-md"
		>
			<input
				type="text"
				name="inputValue"
				required
				placeholder="Suchen nach Name"
				class="w-48 rounded-lg border border-gray-300 px-4 py-2 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-6 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none"
			>
				Suche Name
			</button>
		</form>
		<form
			method="POST"
			action="?/searchById"
			class="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-md"
		>
			<input
				type="number"
				name="inputValue"
				required
				placeholder="Suchen nach Id"
				class="w-48 rounded-lg border border-gray-300 px-4 py-2 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-6 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none"
			>
				Suche Id
			</button>
		</form>
		<form
			method="POST"
			action="?/filerByRsvp"
			class="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-md"
		>
			<select
				name="rsvp"
				required
				class="w-48 rounded-lg border border-gray-300 px-4 py-2 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				<option value="">Wähle</option>
				<option value="1">Akzeptierte Einladung</option>
				<option value="0">Nicht Akzeptierte Einladung</option>
			</select>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-6 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none"
			>
				Suche RSVP
			</button>
		</form>
	</div>

	<div class="mb-8 text-center">
		{#if form?.content}
			<p class="text-lg font-semibold text-[#2a2b55]">
				{form.content[0]?.theName}
				{form.content[0]?.theVorname}
			</p>
			<p class="text-lg font-semibold text-[#2a2b55]">{form.content[0]?.theEmail}</p>
		{/if}
		{#if form?.content && form.content.length > 0}
			{#each form.content as user}
				<div class="mt-4 rounded-lg bg-white p-4 shadow-md">
					<p class="text-lg font-medium text-[#2a2b55]">{user.vorname} {user.nachname}</p>
					<p class="text-sm text-gray-500">{user.email}</p>
				</div>
			{/each}
		{/if}
	</div>

	<div class="mx-auto max-w-6xl rounded-lg bg-white p-8 shadow-lg">
		{#if data && data.users.length > 0}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each data.users as user}
					<div
						class="transform rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:scale-105 hover:shadow-xl"
					>
						<ul class="space-y-4">
							<li class="text-lg font-semibold text-[#2a2b55]">ID: {user.besucher_id}</li>
							<li class="text-base text-gray-700">{user.vorname} {user.nachname}</li>
							<li class="text-sm text-gray-500">{user.email}</li>
						</ul>
						<form method="POST" action="?/deleteUser" class="mt-6">
							<input type="hidden" name="besucher_id" value={user.besucher_id} />
							<button
								type="submit"
								class="w-full rounded-lg bg-red-600 py-2 font-semibold text-white transition duration-300 hover:bg-red-700 focus:outline-none"
							>
								Benutzer löschen
							</button>
						</form>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-lg font-semibold text-red-500">Keine Benutzer gefunden.</p>
		{/if}
	</div>
</main>
