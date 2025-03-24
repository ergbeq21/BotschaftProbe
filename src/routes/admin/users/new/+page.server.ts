import { insertUser } from '$lib/server/db/insertUsers';
import { redirect } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';



export async function load({ locals }) {
    if (!locals.user || locals.user.role !== 'admin') {
        throw error(403, 'Access Denied, only admins have access to this site');
    }
	return {};
}


export const actions = {
	putUser: async ({ request }) => {
		const formData = await request.formData();

		const userName = formData.get('vorname')?.toString() || '';
		const userNachname = formData.get('nachname')?.toString() || '';
		const userEmail = formData.get('email')?.toString() || '';

		if (!userName || !userNachname || !userEmail) {
			return { success: false, message: 'All fields are required.' };
		}

		await insertUser(userName, userNachname, userEmail);
		redirect(303, '/admin/users');

		return { success: true, message: 'User inserted successfully.' };
	}
};
