import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
  client: 'mysql2',
  version: '5.7',
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  pool: {
    min: 2,
    max: 10,
  },
  acquireConnectionTimeout: 10000,
  debug: false,
};

export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
};

export const production: Knex.Config = {
  client: 'mysql2',
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT || 3306),
    ssl: { rejectUnauthorized: false },
  },
};
