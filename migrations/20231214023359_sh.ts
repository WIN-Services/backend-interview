import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table) {
      table.string('user_name').notNullable()
      table.string('password').notNullable()
      table.string('user_type').notNullable()
      table.string('email').notNullable()
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
