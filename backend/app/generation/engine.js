const Generation = require('./index');
const GenerationTable = require('./table');

class GenerationEngine{
    constructor(){
        this.generation = null
        this.timer = null;
    }
    start(){
        this.buildNewGeneration();
    }
    stop(){
        clearTimeout(this.timer);
    }
    buildNewGeneration(){
        //this.generation  is set later, when the promise has resolved successfully
        //setting this.generation here could potentially yield bad dataa
        const generation = new Generation();
        //generationId from promise in table.js
        GenerationTable.storeGeneration(generation)
            .then(({ generationId })=>{
                this.generation = generation
                this.generation.generationId = generationId;
                console.log('new Generation', this.generation)
                this.timer = setTimeout(() => this.buildNewGeneration(), 
                    this.generation.expiration.getTime() - Date.now());
            }).catch(error => console.error(error));
    }
}
module.exports = GenerationEngine;