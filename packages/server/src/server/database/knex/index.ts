import { knex } from 'knex';
import 'dotenv/config';
import mysql2 from 'mysql2';

import { development, production, test } from './Environment';

if (process.env.NODE_ENV === 'production') {
  (mysql2 as any).types.setTypeParser(20, 'text', parseInt);
}

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production;
    case 'test':
      return test;
    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
