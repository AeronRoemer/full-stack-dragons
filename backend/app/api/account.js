const { Router } = require('express');
const AccountTable = require('../account/table.js');
const router = new Router();
const { hash } = require('../account/helper');
const { setSession } = require('./helper.js');

router.post('/signup', (req, res, next) =>{
    const { username, password } = req.body;
    console.log(req.body)
    const usernameHash = hash(username);
    const passwordHash = hash(password);
    AccountTable.getAccount({ usernameHash })
        .then(({account}) => {
            if (!account){
                return AccountTable.storeAccount({ usernameHash, passwordHash })
            } else {
                const error = new Error('The username is already in use');
                error.statusCode =  409;
                console.log('accoun.js 18');
                throw error //passes error to .catch handler
            }
        }).then(() => {
            return setSession({ username, res })
        })
        .then(({message})=> res.json({ message })) //message passed from setSession: 'session created'
        .catch(error => next(error)); 
});

module.exports = router;