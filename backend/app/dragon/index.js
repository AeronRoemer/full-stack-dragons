const TRAITS = require('../../data/traits');

const DEFAULT_PROPS = { //screamcase often used for constants that don't change throughout the application
    nickname: 'unnamed',
    generationId: undefined, 
    dragonId: undefined,
    //getter is used so the 'date' time is created when the new dragon is constructed, not when 'dragon.js' file opens
    get birthdate(){
        return new Date();
    },
    get randomTraits(){
        const traits = [];
        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;

            const traitValue = traitValues[
                Math.floor(Math.random() * traitValues.length)
            ];
            traits.push({traitType,traitValue});
        });
        return traits;
    },
}
class Dragon {
    //set constructor to accept an object so order of arguments isn't important.
    //set an empty object as default so if 'new Dragon()' is called without arguents does not return "Cannot destructure property 'birthdate' of 'undefined' as it is undefined."" 
    constructor({ dragonId, birthdate, nickname, traits, generationId } = {}){
        this.dragonId  = dragonId || DEFAULT_PROPS.dragonId;
        this.birthdate  = birthdate || DEFAULT_PROPS.birthdate;
        this.nickname = nickname || DEFAULT_PROPS.nickname;
        this.traits = traits || DEFAULT_PROPS.randomTraits;
        this.generationId = generationId || DEFAULT_PROPS.generationId;
    }
}

module.exports = Dragon;