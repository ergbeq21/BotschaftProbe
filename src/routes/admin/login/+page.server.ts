import { login } from '$lib/server/db/auth';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, cookies }): Promise<{ success: boolean; message?: string } | void> => {
		const formData = await request.formData();
		const email = formData.get('email') as string | null;
		const password = formData.get('password') as string | null;

		if (!email || !password) {
			return {
				success: false,
				message: 'Email and password are required'
			};
		}

		const token = await login(email, password);

		if (token) {
			cookies.set('session', token, {
				maxAge: 60 * 60 * 24 * 7,
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			});
			throw redirect(302, '/');
		} else {
			return {
				success: false,
				message: 'Login failed'
			};
		}
	}
};
