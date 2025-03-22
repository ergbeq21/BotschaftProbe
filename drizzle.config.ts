import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

console.log('DATABASE_URL:', process.env.DATABASE_URL);

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts',

	dbCredentials: {
		url: process.env.DATABASE_URL
	},

	verbose: true,
	strict: true,
	dialect: 'mysql'
});
