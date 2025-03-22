import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db'; // Adjust import as per your project structure
import { allUsers } from './schema';
import crypto from 'crypto';

export const login = async (email: string, password: string): Promise<string | null> => {
	// Find user with email using Drizzle ORM
	const users = await db.select().from(allUsers).where(eq(allUsers.email, email));

	if (users.length === 0) {
		return null;
	}

	// Check password
	const isPasswordValid = password === users[0].password;
	if (!isPasswordValid) {
		return null;
	}

	// Create token
	const token = crypto.randomUUID();

	// Create expiration date (1 week)
	const expires = new Date();
	expires.setDate(expires.getDate() + 7);

	// Save token with Drizzle ORM
	const result = await db
		.update(allUsers)
		.set({
			session: token,
			sessionExpiration: expires
		})
		.where(eq(allUsers.id, users[0].id))
		.execute();

	const affectedRows = result[0]?.affectedRows ?? 0;

	if (affectedRows === 0) {
		return null;
	}

	// Return token
	return token;
};
