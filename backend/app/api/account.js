const { Router } = require('express');
const AccountTable = require('../account/table.js');
const Session = require('../account/session')
const { hash } = require('../account/helper');
const { setSession } = require('./helper.js');

const router = new Router();

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

router.post('/login', (req, res, next)=>{
    const { username, password } = req.body;
    AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({account}) => { //undefined for no user found, or returned with userId and password hash
            if (account && account.passwordHash === hash(password)){
                const sessionId = account;
                return setSession({ username, res, sessionId }); 
            } else {
                const error = new Error('Invalid username/password');
                error.statusCode = 409;
                throw error;
            }
        }).then(({ message }) => res.json({ message }))
        .catch(error => next(error)); 
})

router.get('/logout', (req, res, next) =>{
    const { username } = Session.parse(req.cookies.sessionString);
    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    }).then(()=>{
        res.clearCookie('sessionString');
    }).catch(error => next(error)); 
    res.json({message: 'session logged out'})
})

router.get('/authenticated', (req, res, next) =>{
    const { sessionString } = req.cookies
    if  (!sessionString || !Session.verify(sessionString)){
        const error = new Error('Invaid Session');
        error.statusCode = 400;
        return next(error);
    } else {
        const { username, id } = Session.parse(sessionString);
        
        AccountTable.getAccount({ usernameHash: hash(username)})
            .then(({ account }) => {
                //checks if account session from 'get account' is equal to the session from the given username 
                const authenticated = account.sessionId === id;
                res.json({ authenticated });
                console.log('get-authenticaed')
            }).catch(error => next(error)); 
    }
    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    }).then(()=>{
    }).catch(error => next(error)); 
    res.json({message: 'session logged out'})
})


module.exports = router;