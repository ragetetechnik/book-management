/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('authors', function (table) {
            table.increments()
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
        })
        .createTable('publishers', function (table) {
            table.increments()
            table.string('name').notNullable()
            table.string('website').notNullable()
        })
        .createTable('categories', function (table) {
            table.increments()
            table.string('name').notNullable()
            table.string('description').notNullable()
        })
        .createTable('books', function (table) {
            table.increments()
            table.string('title').notNullable()
            table.string('isbn').notNullable()
            table.string('condition').notNullable()
            table.integer('publication_year').unsigned().notNullable()
            table.integer('publisher_id').unsigned().references('id').inTable('publishers').onDelete('CASCADE')
            table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        })
        .createTable('book_author', function (table) {
            table.increments()
            table.integer('book_id').unsigned().references('id').inTable('books').onDelete('CASCADE')
            table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('CASCADE')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('book_author')
        .dropTable('books')
        .dropTable('authors')
        .dropTable('publishers')
        .dropTable('categories')
}
