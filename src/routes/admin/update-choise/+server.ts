import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db'; // Adjust if necessary
import { user } from '$lib/server/db/schema'; // Import the correct table
import { visits } from '$lib/server/db/schema'; // Make sure to import the visits table
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
	const userId = url.searchParams.get('userId');
	const choice = url.searchParams.get('choice');

	console.log('Received parameters:', { userId, choice }); // Debugging log

	if (!userId || !choice) {
		console.error('❌ Missing parameters');
		return json({ error: 'Missing parameters' }, { status: 400 });
	}

	const rsvpValue = choice === 'yes' ? 1 : 0;

	try {

		const userRecord = await db
			.select({ besucher_id: user.besucher_id })
			.from(user)
			.where(eq(user.besucher_id, Number(userId)))
			.limit(1);

		if (!userRecord.length) {
			console.error('❌ User not found');
			return json({ error: 'User not found' }, { status: 404 });
		}

		const besucherId = userRecord[0].besucher_id as number; // Type assertion to number

		const result = await db
			.update(visits)
			.set({ rsvp: rsvpValue })
			.where(eq(visits.besucher_id, besucherId)) // Use the correctly typed `besucher_id`
			.execute();

		console.log('✅ Database update result:', result);
		return json({ success: true, message: `RSVP updated to ${rsvpValue}` });
	} catch (error) {
		console.error('🔥 Database update error:', error);
		return json({ error: 'Database update failed' }, { status: 500 });
	}
}
