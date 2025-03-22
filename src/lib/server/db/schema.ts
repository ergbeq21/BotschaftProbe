import { mysqlTable, serial, int, varchar, timestamp } from 'drizzle-orm/mysql-core';


export const user = mysqlTable('users', {
	besucher_id: serial('besucher_id').primaryKey(),
	vorname: varchar('vorname', { length: 50 }).notNull(),
	nachname: varchar('nachname', { length: 50 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique()
});
