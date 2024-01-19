import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.ships, table => {
      table.bigint('imo').primary().index();
      table.string('name').notNullable().checkLength('>', 3);
      table
        .string('email')
        .index()
        .unique()
        .notNullable()
        .checkLength('>', 6);
      table.string('phone').notNullable().checkLength('>', 5);
      table.text('link').notNullable().checkLength('>', 5);
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.users}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.ships).then(() => {
    console.log(`# Dropped table ${ETableNames.ships}`);
  });
}
