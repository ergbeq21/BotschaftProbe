import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db'; // Adjust if necessary
import { user } from '$lib/server/db/schema'; // Import the correct table
import { visits } from '$lib/server/db/schema'; // Import the visits table
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
    // Get the query parameters
    const besucherId = url.searchParams.get('besucher_id'); // Get the besucher_id parameter
    const choice = url.searchParams.get('choice'); // Get the choice parameter

    console.log('Received parameters:', { besucherId, choice }); // Log the parameters for debugging

    // Check if any parameter is missing
    if (!besucherId || !choice) {
        console.error('❌ Missing parameters');
        return json({ error: 'Missing parameters. Please ensure both "besucher_id" and "choice" are provided.' }, { status: 400 });
    }

    const rsvpValue = choice === 'yes' ? 1 : 0;

    try {
        // Find the user by besucher_id
        
const userRecord = await db
.select({ besucher_id: user.besucher_id })
.from(user)
.where(eq(user.besucher_id, Number(besucherId)))
.limit(1);

        if (!userRecord.length) {
            console.error('❌ User not found');
            return json({ error: 'User not found' }, { status: 404 });
        }

        // Update the rsvp value in the visits table
        const result = await db.update(visits)
            .set({ rsvp: rsvpValue })
            .where(eq(visits.besucher_id, Number(besucherId))) // Match by besucher_id in visits table
            .execute();

        console.log('✅ Database update result:', result);
        return json({ success: true, message: `RSVP updated to ${rsvpValue}` });
    } catch (error) {
        console.error('🔥 Database update error:', error);
        return json({ error: 'Database update failed' }, { status: 500 });
    }
}



