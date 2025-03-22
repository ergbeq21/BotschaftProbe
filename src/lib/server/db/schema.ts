import { mysqlTable, serial, int, varchar, timestamp, tinyint } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('users', {
	besucher_id: serial('besucher_id').primaryKey(),
	vorname: varchar('vorname', { length: 50 }).notNull(),
	nachname: varchar('nachname', { length: 50 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique()
});

export const allUsers = mysqlTable('allUsers', {
	id: serial('id').primaryKey(),
	age: int('age').notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	username: varchar('username', { length: 255 }).notNull(),
	role: varchar('role', { length: 50 }).notNull(),
	createdAt: timestamp('createdAt').defaultNow(),
<<<<<<< HEAD
	session: varchar('session', { length: 255 }).notNull(),
	sessionExpiration: varchar('sessionExpiration', { length: 255 }).notNull(),
=======
	session: varchar('session', { length: 255 }).notNull(), // Make sure { length: 255 } is always passed
	sessionExpiration: timestamp('sessionExpiration').notNull(),
>>>>>>> origin/alternative-universe
	password: varchar('password', { length: 255 }).notNull()
});

export const events = mysqlTable('events', {
	event_id: serial('event_id').primaryKey(),
	event_name: varchar('event_name', { length: 255 }).notNull()
});


export const visits = mysqlTable('visits', {
	rsvp: tinyint('rsvp').notNull().default(0),
	qr_code: varchar('qr_code', { length: 255 }).notNull(),
	qr_expiration_date: timestamp('qr_expiration_date').notNull(),

	besucher_id: serial('besucher_id').notNull().references(() => user.besucher_id),
	event_id: serial('event_id').notNull().references(()=> events.event_id)
  });