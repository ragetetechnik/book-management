exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('publishers').del()
        .then(function () {
            // Inserts seed entries
            return knex('publishers').insert([
                { name: 'The Book Company', website: 'thebookcompany.com' },
                { name: 'Readers Publishing', website: 'readerspublishing.com' },
                { name: 'Literary Press', website: 'literarypress.com' },
                { name: 'Epic Reads', website: 'epicreads.com' },
                { name: 'Novel Ideas', website: 'novelideas.com' },
                { name: 'Pioneer Books', website: 'pioneerbooks.com' },
                { name: 'Next Chapter Publishing', website: 'nextchapterpublishing.com' },
                { name: 'Skyline Publishing', website: 'skylinepublishing.com' },
                { name: 'Blue Sky Books', website: 'blueskybooks.com' },
                { name: 'Timeless Tales Publishing', website: 'timelesstales.com' }
            ])
        })
}
