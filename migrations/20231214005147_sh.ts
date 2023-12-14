import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('services', function (table) {
    table.uuid("service_id").defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name').notNullable()
      table.integer('price').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('services')
}
