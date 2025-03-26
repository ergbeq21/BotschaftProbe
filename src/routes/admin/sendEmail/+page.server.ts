import { json } from '@sveltejs/kit';
import { sendTestEmail } from '$lib/server/mailer';




import { redirect, error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		throw error(403, 'Access Denied, only admins have access to this site');
	}
}

export const actions = {
  sendEmail: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const userId = formData.get('userId') as string;

    if (!email || !userId) {
      return { error: 'Missing email or userId' };
    }

    try {
      await sendTestEmail(email, parseInt(userId));
      return { success: true };
    } catch (error) {
      return { error: 'Failed to send email' };
    }
  },
};
