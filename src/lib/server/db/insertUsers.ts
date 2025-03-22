import { db } from './index';
import { user } from './schema';

export async function insertUser(vorname: string, nachname: string, email: string) {
	try {
		await db.insert(user).values({
			vorname,
			nachname,
			email
		});
	} catch (error) {
		console.error('Fehler beim Einfügen des Benutzers:', error);
	}
}
