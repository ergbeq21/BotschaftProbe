// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: InferSelectModel<typeof allUsers>; // Define user type from Drizzle ORM
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
