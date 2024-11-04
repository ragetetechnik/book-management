exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('categories').del()
        .then(function () {
            // Inserts seed entries
            return knex('categories').insert([
                { name: 'Mystery', description: 'Stories involving suspense and solving a crime or puzzle.' },
                { name: 'Fantasy', description: 'Fictional narratives set in imaginary worlds with magical elements.' },
                { name: 'Science Fiction', description: 'Explores futuristic concepts, advanced technology, and space exploration.' },
                { name: 'Romance', description: 'Focuses on romantic relationships and emotional connections between characters.' },
                { name: 'Thriller', description: 'Fast-paced narratives filled with tension and excitement, often involving crime or espionage.' },
                { name: 'Historical Fiction', description: 'Set in the past, blending real historical events with fictional characters.' },
                { name: 'Non-Fiction', description: 'Factual accounts, biographies, and educational texts based on real events.' },
                { name: 'Horror', description: 'Intended to frighten or disturb, often involving supernatural elements or psychological terror.' },
                { name: 'Young Adult', description: 'Fiction aimed at a teenage audience, often dealing with coming-of-age themes.' },
                { name: 'Children’s', description: 'Books specifically written for a younger audience, featuring simple plots and themes.' }
            ])
        })
}