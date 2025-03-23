import { json } from '@sveltejs/kit';
import { sendSpecificEmail } from '$lib/server/db/sendSpecificEmail';
export async function POST() {
	try {
		const info = await sendSpecificEmail();
		return json({ success: true, message: 'Emails sent successfully.', info });
	} catch (error) {
		console.error('Error sending emails:', error);
		return json({ success: false, message: 'Error sending emails.', error });
	}
}
