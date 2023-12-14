import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable("orders", function (table) {
    table.uuid("id").defaultTo(knex.raw('uuid_generate_v4()'));
    table.integer("total_fee").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.specificType("services","text []")
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("orders");
}
