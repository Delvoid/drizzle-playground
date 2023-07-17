import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './turso';

migrate(db, { migrationsFolder: './migrations' })
  .then(() => {
    console.log('Migrations complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migrations failed!', err);
    process.exit(1);
  });
