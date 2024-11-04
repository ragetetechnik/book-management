exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('authors').del()
        .then(function () {
            // Inserts seed entries
            return knex('authors').insert([
                { first_name: "Paul", last_name: 'Miller' },
                { first_name: "Jane", last_name: 'Doe' },
                { first_name: "Mark", last_name: 'Smith' },
                { first_name: "Emily", last_name: 'Johnson' },
                { first_name: "Michael", last_name: 'Brown' },
                { first_name: "Sarah", last_name: 'Davis' },
                { first_name: "David", last_name: 'Wilson' },
                { first_name: "Laura", last_name: 'Garcia' },
                { first_name: "James", last_name: 'Martinez' },
                { first_name: "Jessica", last_name: 'Lopez' }
            ])
        })
}