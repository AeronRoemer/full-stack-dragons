const pool = require('../../databasePool');
const { response } = require('express');

class GenerationTable{
    //static allows GenerationTable.storeGeneration to be caled without creating an instance of the GenerationTable class
    static storeGeneration(generation){
        //promise allows 'generationId' value ot get passed out of the callback function in pool.query()
        //see further steps in engine.js
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO generation(expiration) VALUES($1) RETURNING id',
                [generation.expiration],
                (error, response) => {
                    if (error) return console.error(error)
    
                    const generationId = response.rows[0].id;

                    resolve({ generationId });
                });
        })
    }
}

module.exports = GenerationTable;