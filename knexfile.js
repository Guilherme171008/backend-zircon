import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.dirname(__filename);
const dataDir = path.join(projectRoot, 'data');

fs.mkdirSync(dataDir, { recursive: true });

const baseConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: path.join(projectRoot, 'src', 'database', 'migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.join(projectRoot, 'src', 'database', 'seeds'),
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    },
  },
};

export default {
  development: {
    ...baseConfig,
    connection: {
      filename: process.env.DB_FILENAME || path.join(dataDir, 'zircon.db'),
    },
  },

  production: {
    ...baseConfig,
    connection: {
      filename: process.env.DB_FILENAME || path.join(dataDir, 'zircon.db'),
    },
  },

  test: {
    ...baseConfig,
    connection: {
      filename: path.join(dataDir, 'zircon.test.db'),
    },
  },
};