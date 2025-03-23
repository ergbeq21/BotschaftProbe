import { mysqlTable, serial, int, varchar, timestamp, tinyint } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('users', {
	besucher_id: int('besucher_id').primaryKey().autoincrement(),
	vorname: varchar('vorname', { length: 50 }).notNull(),
	nachname: varchar('nachname', { length: 50 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique()
});

export const events = mysqlTable('events', {
	event_id: int('event_id').primaryKey().autoincrement(),
	event_name: varchar('event_name', { length: 255 }).notNull()
});

export const allUsers = mysqlTable('allUsers', {
	id: serial('id').primaryKey(),
	age: int('age').notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	username: varchar('username', { length: 255 }).notNull(),
	role: varchar('role', { length: 50 }).notNull(),
	createdAt: timestamp('createdAt').defaultNow(),
	session: varchar('session', { length: 255 }).notNull(),
	sessionExpiration: timestamp('sessionExpiration').notNull(),
	password: varchar('password', { length: 255 }).notNull()
});

export const visits = mysqlTable('visits', {
	rsvp: tinyint('rsvp').notNull().default(0),
	qr_code: varchar('qr_code', { length: 255 }).notNull(),
	qr_expiration_date: timestamp('qr_expiration_date').notNull(),
	besucher_id: int('besucher_id')
		.notNull()
		.references(() => user.besucher_id),
	event_id: int('event_id')
		.notNull()
		.references(() => events.event_id)
});
