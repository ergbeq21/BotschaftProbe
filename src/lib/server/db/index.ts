import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = await mysql.createConnection(process.env.DATABASE_URL);

export const db = drizzle(client, {
	schema,
	mode: 'default'
});
