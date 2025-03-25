import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db'; 
import { allUsers } from './schema';
import crypto from 'crypto';

export const login = async (email: string, password: string): Promise<string | null> => {
	const users = await db.select().from(allUsers).where(eq(allUsers.email, email));

	if (users.length === 0) {
		return null;
	}

	const isPasswordValid = password === users[0].password;
	if (!isPasswordValid) {
		return null;
	}

	const token = crypto.randomUUID();

	const expires = new Date();
	expires.setDate(expires.getDate() + 7);

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

	return token;
};
