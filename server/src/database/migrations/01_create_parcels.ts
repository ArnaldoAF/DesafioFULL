import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('parcels', table => {
        table.increments('id').primary();
        table.string('number').notNullable();
        table.string('due_date').notNullable();
        table.decimal('value').notNullable();

        table.integer('title_id')
            .notNullable()
            .references('id')
            .inTable('title')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('parcels');
}