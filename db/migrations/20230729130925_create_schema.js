/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("phone").notNullable();
    table.string("address");
    table.boolean("isadmin");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("orders", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned();
    table.foreign("userId").references('users.id');
    table.specificType("service", "json[]").notNullable();
    table.float("totalfee").notNullable();
    table.datetime("datetime").notNullable;
  });

  await knex.schema.createTable("services", function (table) {
    table.increments("id").primary();
    table.string("name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("orders");
  await knex.schema.dropTable("services");
};
