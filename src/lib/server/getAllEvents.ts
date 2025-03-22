import { db } from './db';

import { events } from './db/schema';

interface Events {
	event_id: number;
	event_name: string;
}

export async function GetAllEvents(): Promise<Events[]> {
	const eventData = await db.select().from(events);

	return eventData.map((events) => ({
		event_id: events.event_id,
		event_name: events.event_name
	}));
}
