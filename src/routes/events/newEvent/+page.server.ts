import { addEvent } from '$lib/server/db/insertEvent';
import { redirect } from '@sveltejs/kit';
import { request } from 'http';

export const actions = {
	addNewEvent: async ({ request }) => {
		const formData = await request.formData();
		const eventName = formData.get('name')?.toString() || '';

		if (!eventName) {
			return { success: false, message: 'Please enter the event name' };
		}

		await addEvent(eventName);
		redirect(303, '/events');

		return { success: true, message: 'Event inserted successfully.' };
	}
};
