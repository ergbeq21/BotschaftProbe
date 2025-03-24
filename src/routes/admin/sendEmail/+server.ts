import { json } from '@sveltejs/kit';
import { sendTestEmail } from '$lib/server/mailer';

export async function POST({ request }) {
	const { email, userId } = await request.json();

	if (!email || !userId) {
		return json({ error: 'Missing email or userId' }, { status: 400 });
	}

	try {
		// Call your email sending function with both email and userId
		await sendTestEmail(email, parseInt(userId));
		return json({ success: 'E-Mail wurde gesendet!' });
	} catch (error) {
		return json(
			{
				error: 'Fehler beim Senden der E-Mail',
				message: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
}
