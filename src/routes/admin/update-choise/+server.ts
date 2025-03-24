import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { visits } from '$lib/server/db/schema'; 
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
  console.log('Received request at /admin/update-choise');


  const besucherIdString = url.searchParams.get('besucher_id');
  const choice = url.searchParams.get('choice');

  console.log('Received parameters:', { besucherIdString, choice });

  if (!besucherIdString || !choice) {
    return json({ error: 'Invalid or missing parameters' }, { status: 400 });
  }

  const besucherId = Number(besucherIdString);
  if (isNaN(besucherId)) {
    return json({ error: 'Invalid userId' }, { status: 400 });
  }

  const rsvpValue = choice === 'yes' ? 1 : 0; 

  try {
    const result = await db.update(visits)
      .set({ rsvp: rsvpValue })
      .where(eq(visits.besucher_id, besucherId))
      .execute();

    console.log('RSVP updated successfully:', result);
    return json({ success: true, message: `RSVP updated to ${rsvpValue}` });
  } catch (error) {
    console.error('Database update error:', error);
    return json({ error: 'Database update failed' }, { status: 500 });
  }
}
