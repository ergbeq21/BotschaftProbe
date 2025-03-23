import { json } from '@sveltejs/kit';
import { sendSpecificEmal } from '$lib/server/db/sendSpecificEmail';

export async function POST() {
	try {
		const info = await sendSpecificEmal();
		return json({ success: true, message: 'Emails sent successfully.', info });
	} catch (error) {
		console.error('Error sending emails:', error);
		return json({ success: false, message: 'Error sending emails.', error });
	}
}
