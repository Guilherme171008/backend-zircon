import db from '../src/config/database.js';

try {
  await db.migrate.latest();
  console.log('✅ Migrations completed');

  const rows = await db.raw('PRAGMA table_info(applications)');
  console.log(JSON.stringify(rows, null, 2));
} catch (error) {
  console.error('❌ Migration failed');
  console.error(error);
  process.exit(1);
} finally {
  await db.destroy();
}
