import { GetAllEvents } from '$lib/server/getAllEvents';
import { deleteEvent } from '$lib/server/db/deleteEvent.js';
import { redirect, error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		throw error(403, 'Access Denied, only admins have access to this site');
	}
	const events = await GetAllEvents();
	const serializedEvents = JSON.parse(JSON.stringify(events));

	return {
		events: serializedEvents
	};
}

export const actions = {
	deleteEvent: async ({ request }) => {
		const formData = await request.formData();
		const eventId = Number(formData.get('event_id'));

		if (!eventId) {
			return { success: false, message: 'Invalid event ID' };
		}

		await deleteEvent(eventId);
		return { success: true, message: 'Event deleted successfully' };
	}
};
