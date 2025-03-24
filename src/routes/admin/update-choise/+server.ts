import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { visits } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
    console.log('✅ Route hit:', url.toString());

    const userId = url.searchParams.get('userId');
    const choice = url.searchParams.get('choice');

    if (!userId || !choice) {
        console.error('❌ Missing parameters');
        return json({ error: 'Missing parameters' }, { status: 400 });
    }

    const rsvpValue = choice === 'yes' ? 1 : 0;

    try {
        const result = await db.update(visits)
            .set({ rsvp: rsvpValue })
            .where(eq(visits.besucher_id, Number(userId)))
            .execute();

        console.log('✅ Database update result:', result);
        return json({ success: true, message: `RSVP updated to ${rsvpValue}` });
    } catch (error) {
        console.error('🔥 Database update error:', error);
        return json({ error: 'Database update failed' }, { status: 500 });
    }
}
