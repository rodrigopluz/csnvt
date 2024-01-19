import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.users, table => {
      table.increments('id').primary().index();
      table.string('name').notNullable().checkLength('>', 3);
      table
        .string('email')
        .index()
        .unique()
        .notNullable()
        .checkLength('>', 6);
      table.string('password').notNullable().checkLength('>', 5);
      table.tinyint('status').defaultTo(1);
      table.tinyint('perfil').defaultTo(2);
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.users}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.users).then(() => {
    console.log(`# Dropped table ${ETableNames.users}`);
  });
}
