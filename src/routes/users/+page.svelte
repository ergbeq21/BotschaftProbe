<script>
	// @ts-nocheck
	export let data;
	export let form;
	console.log(data?.users);

</script>

<main class="min-h-screen bg-gray-50 p-10">
	<h1 class="mb-8 text-center text-4xl font-extrabold text-[#2a2b55]">
		Übersicht von allen Besuchern
	</h1>
	<div class="mb-8 flex justify-center flex-col">
		<a class="text-center text-2xl font-extrabold text-[#1e21d4]" href="/events">Go to Events</a>
		<a class="text-center text-l font-extrabold text-[#d4301e]" href="./">Go Back</a>
	</div>

	<div class="mb-8 flex justify-center space-x-6">
		<a
			href="/users/new"
			class="rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow-lg transition duration-300 hover:bg-blue-700"
		>
			Füge einen Besucher hinzu
		</a>

		<form method="POST" action="?/searchByName" class="flex items-center space-x-4">
			<input
				type="text"
				name="inputValue"
				required
				placeholder="Suchen nach Name"
				class="w-48 rounded-lg border border-gray-300 px-4 py-2 text-lg shadow-sm"
			/>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-4 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700"
			>
				Suche Name
			</button>
		</form>
		<form method="POST" action="?/searchById" class="flex items-center space-x-4">
			<input
				type="number"
				name="inputValue"
				required
				placeholder="Suchen nach Id"
				class="w-48 rounded-lg border border-gray-300 px-4 py-2 text-lg shadow-sm"
			/>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-4 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700"
			>
				Suche Id
			</button>
		</form>
		<form method="POST" action="?/filerByRsvp" class="flex items-center space-x-4">
			<select
			  name="rsvp"
			  required
			  class="w-75 rounded-lg border border-gray-300 px-4 py-2 text-lg shadow-sm"
			>
			  <option value="">Wähle</option>
			  <option value="1">Akzeptierte Einladung</option>
			  <option value="0">Nicht Akzeptierte Einladung</option>

			</select>
			<button
			  type="submit"
			  class="rounded-lg bg-blue-600 px-4 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700"
			>
			  Suche RSVP
			</button>
		  </form>
		
	</div>

	<div class="mb-6 text-center">
		{#if form?.content}
			<p class="text-lg text-[#2a2b55]">{form.content[0]?.theName} {form.content[0]?.theVorname}</p>
			<p class="text-lg text-[#2a2b55]">{form.content[0]?.theEmail}</p>
		{/if}
		{#if form?.content && form.content.length > 0}
        {#each form.content as user}
        <div>
            <p>{user.vorname} {user.nachname}</p>
            <p>{user.email}</p>
        </div>
        {/each}
		{/if}
	</div>

	<div class="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
		{#if data && data.users.length > 0}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each data.users as user}
					<div
						class="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-md transition duration-300 hover:shadow-lg"
					>
						<ul class="space-y-3">
							<li class="text-xl font-semibold text-[#2a2b55]">ID: {user.besucher_id}</li>
							<li class="text-lg font-medium text-gray-700">{user.vorname} {user.nachname}</li>
							<li class="text-sm text-gray-600">{user.email}</li>
						</ul>
						<form method="POST" action="?/deleteUser" class="mt-6">
							<input type="hidden" name="besucher_id" value={user.besucher_id} />
							<button
								type="submit"
								class="w-full rounded-lg bg-red-600 py-2 text-white transition duration-300 hover:bg-red-700"
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
