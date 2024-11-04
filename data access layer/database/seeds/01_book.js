exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('book').del()
        .then(function () {
            // Inserts seed entries
            return knex('book').insert([
                { title: 'the book' }
            ])
        })
}
