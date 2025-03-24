import { json } from '@sveltejs/kit';
import { sendTestEmail } from '$lib/server/mailer';
import { GetAllUsers } from '$lib/server/db/getUsers.js'; // Assuming this function fetches users from your database

export async function POST({ request }) {
    const { email } = await request.json();

    if (!email) {
        return json({ error: 'Keine E-Mail-Adresse angegeben' }, { status: 400 });
    }

    try {
        // Fetch the user from the database using the email
        const users = await GetAllUsers(email); // This returns an array of users

        if (!users || users.length === 0) {
            return json({ error: 'User not found' }, { status: 404 });
        }

        // Access the first user from the array
        const user = users[0];

        // Assuming user.besucher_id is the user ID you need
        const userId = user.besucher_id;

        // Send the email with the userId
        const result = await sendTestEmail(email, userId);

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
