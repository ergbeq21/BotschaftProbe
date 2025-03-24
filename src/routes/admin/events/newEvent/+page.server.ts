import { addEvent } from '$lib/server/db/insertEvent';
import { redirect } from '@sveltejs/kit';
import { request } from 'http';

import { error } from '@sveltejs/kit';



export async function load({ locals }) {
    if (!locals.user || locals.user.role !== 'admin') {
        throw error(403, 'Access Denied, only admins have access to this site');
    }
	return {};
}

export const actions = {
	addNewEvent: async ({ request }) => {
		const formData = await request.formData();
		const eventName = formData.get('name')?.toString() || '';

		if (!eventName) {
			return { success: false, message: 'Please enter the event name' };
		}

		await addEvent(eventName);
		redirect(303, '/admin/events');

		return { success: true, message: 'Event inserted successfully.' };
	}
};
