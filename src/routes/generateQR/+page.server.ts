import QRCode from 'qrcode';
import type { Actions } from './$types';
import { getUserByName } from '$lib/server/db/getUserByName';
import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		throw error(403, 'Access Denied, only admins have access to this site');
	}
	return {};
};

export const actions: Actions = {
	getUserName: async ({
		request
	}): Promise<{ success: boolean; message?: string; qrCode?: string }> => {
		try {
			const formData = await request.formData();
			const getName = formData.get('inputValue') as string | null;

			if (!getName) {
				return { success: false, message: 'Name is required!' };
			}

			let user = await getUserByName(getName);

			if (!user) {
				return { success: false, message: 'User not found!' };
			}

			const qrCodeImage = await QRCode.toDataURL(getName);

			return { success: true, qrCode: qrCodeImage };
		} catch (error) {
			console.error('Error generating QR Code:', error);
			return { success: false, message: 'Something went wrong!' };
		}
	}
} satisfies Actions;
