import { db } from './index';
import { user } from './schema';
import { eq } from 'drizzle-orm';

export async function deleteUser(id: number) {
	const deletedUser = await db.delete(user).where(eq(user.besucher_id, id));
}
