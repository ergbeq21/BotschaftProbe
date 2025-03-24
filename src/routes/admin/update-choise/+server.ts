import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db'; // Adjust this if necessary
import { visits } from '$lib/server/db/schema'; // Import the visits table
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
    console.log('Received request at /admin/update-choice');
    
    const besucherId = url.searchParams.get('besucher_id');
    const choice = url.searchParams.get('choice');
    
    console.log('Received parameters:', { besucherId, choice });

    if (!besucherId || !choice) {
        return json({ error: 'Missing parameters' }, { status: 400 });
    }

    const rsvpValue = choice === 'yes' ? 1 : 0;

    try {
        const result = await db.update(visits)
            .set({ rsvp: rsvpValue })
            .where(eq(visits.besucher_id, Number(besucherId)))
            .execute();

        console.log('RSVP updated successfully:', result);
        return json({ success: true, message: `RSVP updated to ${rsvpValue}` });
    } catch (error) {
        console.error('Database update error:', error);
        return json({ error: 'Database update failed' }, { status: 500 });
    }
}
