const { Router } = require('express');
const AccountTable = require('../account/table.js')
const router = new Router();
const { hash } = require('../account/helper');

router.post('/signup', (req, res, next) =>{
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);
    AccountTable.getAccount({ usernameHash })
        .then(({account}) => {
            if (!account){
                return AccountTable.storeAccount({ usernameHash, passwordHash })
            } else {
                const error = new Error('The username is already in use');
                error.statusCode =  409;
                throw error //passes error to .catch handler
            }
        }).then(() => res.json({ message: 'success!' }))
        .catch(error => next(error)); 
});

module.exports= router