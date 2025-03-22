import { db } from '.';
import { events } from './schema';

export async function addEvent(event_name: string) {
	try {
		await db.insert(events).values({
			event_name
		});
	} catch (error) {
		console.error('Fehler beim Einfügen des Benutzers:', error);
	}
}
