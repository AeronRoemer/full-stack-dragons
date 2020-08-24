const pool = require('../../databasePool');
const Dragon = require('./index');
const DragonTable = require('./table');

function getDragonWithTraits({ dragonId }){
    return Promise.all([
        DragonTable.getDragon({ dragonId }),
        new Promise((resolve, reject) =>{
                            //INNER JOIN used to get access to dragonId column
            pool.query(
                `SELECT "traitType", "traitValue" FROM trait
                INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
                WHERE dragonTrait."dragonId" = $1`,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error)
                    resolve(response.rows);
                }
            )
        })
    ])
    .then(([dragon, dragonTraits])=>{ //dragon from getDragon, traits from query
        //since all other Dragons are class instances, we are recreating one here for internal consistency
        return new Dragon({...dragon, dragonId, traits: dragonTraits})
        //spread dragon object, add dragonId and traits
    })
}
getDragonWithTraits({ dragonId: 14 })
.then(dragon => console.log(dragon))
.catch(error => console.log(error))
module.exports = { getDragonWithTraits };