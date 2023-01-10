'use-strict';

exports.up = async function (knex) {
    await knex.schema.createTable('orders', table => {
        table.increments('id').primary();
        table.specificType('services', 'integer[]').nullable();
        table.timestamp('dateTime').defaultTo(knex.fn.now());
    })

    await knex.schema.createTable('services', table => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.integer('fee').notNullable()
    }).then(async () => {
        //adding sample data
        await knex.raw(`insert into services (name, fee) values ('Inspection', 123),('Testing', 789),('Analysis', 456)`);
        await knex.raw(`insert into orders (services) values ('{1,2,3}')`);
    })

};

exports.down = async function (knex) {
    await knex.schema.dropTable('orders')
    await knex.schema.dropTable('services')
};
