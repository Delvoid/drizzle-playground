import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import { todos } from './schema';

const connection = createClient({
  url: process.env.DATABASE_URL || '',
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(connection);
