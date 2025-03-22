import { mysqlTable, serial, varchar, int } from 'drizzle-orm/mysql-core';
import { resolveEnvPrefix } from 'vite';

export const user = mysqlTable('users', {
	besucher_id: serial('besucher_id').primaryKey(),
	vorname: varchar('vorname', { length: 50 }).notNull(),
	nachname: varchar('nachname', { length: 50 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique()
});
