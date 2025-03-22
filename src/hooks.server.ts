import { db } from '$lib/server/db'; // Import your Drizzle database connection
import { allUsers } from '$lib/server/db/schema'; // Import the schema
import { eq } from 'drizzle-orm';
import type { Handle } from '@sveltejs/kit';



export const handle : Handle = async ({ event, resolve }) => {
	// Get session token from cookies
	const session = event.cookies.get('session');

	if (!session) {
		// No session, load page as normal
		return await resolve(event);
	}

	// Find the user in Drizzle based on session token
	const users = await db
		.select()
		.from(allUsers)
		.where(eq(allUsers.session_token, session));

	if (users.length === 0) {
		// If no user is found, remove the session cookie
		event.cookies.set('session', '', {
			path: '/',
			maxAge: -1
		});
		return await resolve(event);
	}

	// Set user data in event.locals
	event.locals.user = users[0];

	// Load page as normal
	return await resolve(event);
};
