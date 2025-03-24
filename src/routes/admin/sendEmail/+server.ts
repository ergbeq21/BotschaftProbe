import { json } from '@sveltejs/kit';
import { sendTestEmail } from '$lib/server/mailer';
import { GetAllUsers } from '$lib/server/db/getUsers.js';

export async function POST({ request }) {
	const { email } = await request.json();

	if (!email) {
		return json({ error: 'Keine E-Mail-Adresse angegeben' }, { status: 400 });
	}

	try {
		const result = await sendTestEmail(email);
		return json({ success: 'E-Mail wurde gesendet!', messageId: result?.messageId });
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
