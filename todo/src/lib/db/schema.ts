import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todo', {
  id: integer('id').primaryKey(),
  task: text('text').notNull(),
  complete: integer('complete', { mode: 'boolean' }).default(false).notNull(),
  completed_at: text('completed_at'),
});
