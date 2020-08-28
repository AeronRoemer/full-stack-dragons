const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account')

const app = express();
const engine = new GenerationEngine();
app.locals.engine = engine; //gives access to engine across app
app.use(cors({origin: 'http://localhost:5100'}));
app.use(bodyParser.json()); //to read POST requests

app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);
app.use('/account', accountRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        type: 'error', message: err.message
    })
});

engine.start();
setTimeout(()=>{
    engine.stop();
}, 500000)

module.exports = app;