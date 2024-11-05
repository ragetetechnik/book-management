exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('books').del()
        .then(function () {
            // Inserts seed entries
            return knex('books').insert([
                { publisher_id: 1, category_id: 1, title: 'The Book', isbn: '978-3-16-148410-0', publication_year: '2022', condition: 'minor creases on the cover, name entry' },
                { publisher_id: 1, category_id: 8, title: 'Mystery of the Lost Treasure', isbn: '978-1-23-456789-7', publication_year: '2021', condition: 'like new' },
                { publisher_id: 2, category_id: 8, title: 'A Journey Through Time', isbn: '978-0-12-345678-9', publication_year: '2020', condition: 'good condition' },
                { publisher_id: 3, category_id: 8, title: 'Secrets Unraveled', isbn: '978-1-98-765432-1', publication_year: '2019', condition: 'acceptable, worn edges' },
                { publisher_id: 4, category_id: 8, title: 'Love in the Time of Corona', isbn: '978-0-14-313792-0', publication_year: '2021', condition: 'new' },
                { publisher_id: 4, category_id: 5, title: 'Chasing Shadows', isbn: '978-0-12-123456-7', publication_year: '2018', condition: 'very good, slight wear' },
                { publisher_id: 6, category_id: 5, title: 'Historical Echoes', isbn: '978-0-12-654321-0', publication_year: '2017', condition: 'good, some highlights' },
                { publisher_id: 7, category_id: 5, title: 'Fright Night', isbn: '978-1-12-345678-9', publication_year: '2022', condition: 'new, sealed' },
                { publisher_id: 8, category_id: 8, title: 'Coming of Age', isbn: '978-0-12-098765-4', publication_year: '2023', condition: 'like new' },
                { publisher_id: 9, category_id: 9, title: 'Adventures of the Young Explorer', isbn: '978-3-16-148410-1', publication_year: '2021', condition: 'acceptable, some pages dog-eared' },
                { publisher_id: 3, category_id: 2, title: 'The Little Prince', isbn: '978-0-06-112241-5', publication_year: '2019', condition: 'very good' },
                { publisher_id: 1, category_id: 2, title: 'The Hidden Key', isbn: '978-1-23-456789-8', publication_year: '2020', condition: 'good condition' },
                { publisher_id: 3, category_id: 5, title: 'Galactic Adventures', isbn: '978-0-12-345678-0', publication_year: '2018', condition: 'acceptable' },
                { publisher_id: 3, category_id: 4, title: 'Romantic Interlude', isbn: '978-0-12-765432-1', publication_year: '2022', condition: 'new' },
                { publisher_id: 4, category_id: 5, title: 'The Last Stand', isbn: '978-1-98-765432-0', publication_year: '2021', condition: 'like new' },
                { publisher_id: 5, category_id: 6, title: 'Whispers of the Past', isbn: '978-1-23-456789-9', publication_year: '2020', condition: 'good condition' },
                { publisher_id: 6, category_id: 7, title: 'Nightmare Stories', isbn: '978-0-12-345678-8', publication_year: '2023', condition: 'new' },
                { publisher_id: 4, category_id: 1, title: 'Youthful Dreams', isbn: '978-1-12-345678-8', publication_year: '2021', condition: 'very good' },
                { publisher_id: 8, category_id: 1, title: 'The Great Adventure', isbn: '978-0-12-098765-5', publication_year: '2019', condition: 'acceptable' },
                { publisher_id: 5, category_id: 4, title: 'Stories for Kids', isbn: '978-0-06-112241-6', publication_year: '2022', condition: 'like new' }
            ])
        })
}
