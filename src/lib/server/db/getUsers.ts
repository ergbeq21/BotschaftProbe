import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

interface User {
	besucher_id: number;
	vorname: string;
	nachname: string;
	email: string;
}

export async function GetAllUsers(): Promise<User[]> {
	const users = await db.select().from(user);

	return users.map((user) => ({
		besucher_id: user.besucher_id,
		vorname: user.vorname,
		nachname: user.nachname,
		email: user.email
	}));
}
