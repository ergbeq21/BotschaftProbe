import { db } from './index';
import { events } from './schema';
import { eq } from 'drizzle-orm';

export async function deleteEvent(eventid: number) {
	const deletedEvent = await db.delete(events).where(eq(events.event_id, eventid));
}
