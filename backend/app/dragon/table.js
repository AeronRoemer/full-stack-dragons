const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table')

class DragonTable{
    static storeDragon(dragon){
        const {birthdate, nickname, generationId} = dragon;
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO dragon(birthdate, nickname, "generationId") VALUES($1, $2, $3) RETURNING id',
                [dragon.birthdate, dragon.nickname, dragon.generationId],
                (error, response) => {
                    if (error) return console.error(error)
    
                    const dragonId = response.rows[0].id;

                    Promise.all(dragon.traits.map(({traitType, traitValue})=>{
                        return DragonTraitTable.storeDragonTrait({
                            dragonId, traitType, traitValue
                        })
                    }))
                        .then(() => resolve({ dragonId }))
                        .catch(error => reject(error))
                    //'map' amd 'return' were used instead of forEach in order to get an array of promises
                    //the array is used with Promise.all
                    
                });
        })
    }
    static getDragon({ dragonId }){
        return new Promise((resolve, reject) =>{
            pool.query(
                'SELECT birthdate, nickname, "generationId" FROM dragon WHERE dragon.id = $1',
                [dragonId],
                (error, response) => {
                    if (error) return console.error(error)

                    if (response.rows.length === 0 ) return reject(new Error('no dragon'));
                    resolve(response.rows[0]);
                }
            )
        })
    }
}
//debugging code
// DragonTable.getDragon({ dragonId: 1 })
// .then(dragon => console.log(dragon))
module.exports = DragonTable;