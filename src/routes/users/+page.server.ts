import { GetAllUsers } from '$lib/server/db/getUsers';
import { deleteUser } from '$lib/server/db/deleteUser.js';
import { getUserByName, getUserById } from '$lib/server/db/getUserById';

<<<<<<< HEAD
export async function load() {
=======
export async function load({locals}) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}
>>>>>>> origin/alternative-universe
	const users = await GetAllUsers();
	const serializedUsers = JSON.parse(JSON.stringify(users));

	return {
		users: serializedUsers
	};
}

export const actions = {
	deleteUser: async ({ request }) => {
		const formData = await request.formData();
		const userId = Number(formData.get('besucher_id'));

		if (!userId) {
			return { success: false, message: 'Invalid user ID' };
		}

		await deleteUser(userId);
		return { success: true, message: 'User deleted successfully' };
	},
	searchByName: async ({ request }) => {
		const formData = await request.formData();
		const input = formData.get('inputValue');

		if (!input) {
			return { error: 'Invalid input' };
		}

		const userName = String(input);

		let result = await getUserByName(userName);
		return { content: result };
	},
	searchById: async ({ request }) => {
		const formData = await request.formData();
		const input = formData.get('inputValue');

		if (!input) {
			return { error: 'Invalid input' };
		}

		const userId = Number(input);
		if (isNaN(userId)) {
			return { error: 'Invalid number' };
		}

		let result = await getUserById(userId);
		return { content: result };
	}
};
function redirect(arg0: number, arg1: string) {
	throw new Error('Function not implemented.');
}
