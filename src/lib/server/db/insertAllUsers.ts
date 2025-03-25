import { db } from './index';
import { allUsers } from './schema';

export const insertAllUsers = async () => {
	try {
		const newUser = {
			age: 25,
			email: 'example@example.com',
			username: 'john_doe',
			role: 'user',
			session: 'some-unique-session-id',
			sessionExpiration: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
			password: 'hashed-password'
		};

		await db.insert(allUsers).values(newUser);

		console.log('User inserted successfully');
		return true;
	} catch (error) {
		console.error('Error inserting user:', error);
		return false;
	}
};
