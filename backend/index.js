const express = require('express');

const GenerationEngine = require('./engine')
const app = express();

const engine = new GenerationEngine();
engine.start();
setTimeout(()=>{
    engine.stop();
}, 2000000)

app.get('/dragon/new', (req, res) =>{
    res.json({
        dragon: engine.generation.newDragon()
    })
});

app.listen(3000, () => console.log('listening on port 3000'));