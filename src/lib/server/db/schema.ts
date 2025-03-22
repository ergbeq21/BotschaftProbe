import { mysqlTable, serial, int, varchar, timestamp } from 'drizzle-orm/mysql-core';


export const user = mysqlTable('users', {
	besucher_id: serial('besucher_id').primaryKey(),
	vorname: varchar('vorname', { length: 50 }).notNull(),
	nachname: varchar('nachname', { length: 50 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique()
});

export const allUsers = mysqlTable('allUsers', {
	id: serial('id').primaryKey(),
	age: int('age').notNull(), // Ensure 'age' is required
	email: varchar('email', { length: 255 }).notNull(),
	username: varchar('username', { length: 255 }).notNull(),
	role: varchar('role', { length: 50 }).notNull(),
	createdAt: timestamp('createdAt').defaultNow(), // Auto-generate timestamp
	session_token: varchar('session', { length: 255 }).notNull(),
	sessionExpiration: varchar('sessionExpiration', { length: 255 }).notNull(), // Fixed typo
	password: varchar('password', { length: 255 }).notNull() // Fixed typo
});
