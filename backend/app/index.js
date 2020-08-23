const express = require('express');

const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation')
const app = express();

const engine = new GenerationEngine();
app.locals.engine = engine; //gives access to engine across app
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

engine.start();
setTimeout(()=>{
    engine.stop();
}, 2000000)

app.get('/generation', (req, res) =>{
    res.json({
        generation: engine.generation,
    })
});

module.exports = app;