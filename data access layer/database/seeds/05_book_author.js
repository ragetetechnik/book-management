exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('book_author').del()
        .then(function () {
            // Inserts seed entries
            return knex('book_author').insert([
                { book_id: 1, author_id: 5 },
                { book_id: 2, author_id: 8 },
                { book_id: 3, author_id: 4 },
                { book_id: 3, author_id: 8 },
                { book_id: 3, author_id: 9 },
                { book_id: 4, author_id: 1 },
                { book_id: 5, author_id: 3 },
                { book_id: 6, author_id: 1 },
                { book_id: 7, author_id: 4 },
                { book_id: 8, author_id: 7 },
                { book_id: 9, author_id: 7 },
                { book_id: 9, author_id: 8 },
                { book_id: 10, author_id: 1 },
                { book_id: 11, author_id: 2 },
                { book_id: 12, author_id: 1 },
                { book_id: 13, author_id: 1 },
                { book_id: 14, author_id: 8 },
                { book_id: 15, author_id: 2 },
                { book_id: 15, author_id: 6 },
                { book_id: 16, author_id: 3 },
                { book_id: 17, author_id: 2 },
                { book_id: 18, author_id: 3 },
                { book_id: 19, author_id: 5 },
                { book_id: 20, author_id: 7 }
            ])
        })
}
