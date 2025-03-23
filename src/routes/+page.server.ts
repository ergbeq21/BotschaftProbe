import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Check if the user is logged in and has the correct role

	return {
		user: locals.user // Make sure this returns the user data
	};
};
