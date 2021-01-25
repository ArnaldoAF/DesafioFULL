import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('titles', table => {
        table.increments('id').primary();
        table.string('number').notNullable();
        table.string('name').notNullable();
        table.string('cpf').notNullable();
        table.decimal('interest').notNullable();
        table.decimal('penalty').notNullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('titles');
}