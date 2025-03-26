import { db } from '.';
import { user } from './schema';
import { eq } from 'drizzle-orm';
import { count } from 'drizzle-orm';

const result = await db.select({ count: count() }).from(user);

export async function getUserByName(vorname: string) {
	const result = await db
		.select({
			theId: user.besucher_id,
			theName: user.vorname,
			theVorname: user.nachname,
			theEmail: user.email
		})
		.from(user)
		.where(eq(user.vorname, vorname))
		.execute();

	return result.length > 0 ? result[0] : null;
}
