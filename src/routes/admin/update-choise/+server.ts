import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db'; // Ensure correct import path
import { visits, user } from '$lib/server/db/schema'; // Ensure correct import path
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
    console.log('Received request at /admin/update-choice');

    const besucherIdString = url.searchParams.get('besucher_id');
    const choice = url.searchParams.get('choice');

    console.log('Received parameters:', { besucherIdString, choice });

    // Check if besucher_id is valid
    const besucherId = Number(besucherIdString);

    if (isNaN(besucherId) || !choice) {
        return json({ error: 'Invalid or missing parameters' }, { status: 400 });
    }

    const rsvpValue = choice === 'yes' ? 1 : 0;

    try {
        // Verify if besucher_id exists in the users table
        const userExists = await db.select().from(user).where(eq(user.besucher_id, besucherId)).limit(1);

        console.log('User exists check result:', userExists); // Log the result of the query

        if (userExists.length === 0) {
            console.log(`User with besucher_id ${besucherId} not found.`);
            return json({ error: 'User not found' }, { status: 404 });
        }

        // Log before executing the update query
        console.log('Attempting to update the database...');
        const result = await db.update(visits)
            .set({ rsvp: rsvpValue })
            .where(eq(visits.besucher_id, besucherId))  // Ensure correct column name and type
            .execute();

        // Log the result object to inspect its structure
        console.log('Database update result:', result);

        // Check the result for affectedRows
        if (result && result[0]?.affectedRows > 0) {
            console.log('RSVP updated successfully');
            return json({ success: true, message: `RSVP updated to ${rsvpValue}` });
        } else {
            console.log('No rows affected, possible issue with query');
            return json({ error: 'No rows affected by the update' }, { status: 500 });
        }
    } catch (error) {
        // Log the complete error message for debugging
        console.error('Database update error:', error);

        // Check if the error has a specific message
        if (error instanceof Error) {
            return json({ error: error.message }, { status: 500 });
        }

        // Fallback error response
        return json({ error: 'Database update failed' }, { status: 500 });
    }
}
