import { db } from '.';
import { visits, user } from './schema';
import { eq } from 'drizzle-orm';

interface User {
	besucher_id: number;
	vorname: string;
	nachname: string;
	email: string;
}

export async function getBesucherByRsvp(rsvp: number): Promise<User[]> {
	const users = await db
		.select({
			besucher_id: user.besucher_id,
			vorname: user.vorname,
			nachname: user.nachname,
			email: user.email
		})
		.from(user)
		.leftJoin(visits, eq(user.besucher_id, visits.besucher_id))
		.where(eq(visits.rsvp, rsvp))
		.execute();

	return users.map((row: any) => ({
		besucher_id: row.besucher_id as number,
		vorname: row.vorname as string,
		nachname: row.nachname as string,
		email: row.email as string
	}));
}
