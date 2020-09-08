const { Router } = require('express');
const AccountTable = require('../account/table.js');
const Session = require('../account/session')
const { hash } = require('../account/helper');
const { setSession, authenticatedAccount } = require('./helper.js');
const AccountDragonTable = require('../accountDragon/table.js');
const { getDragonWithTraits } = require('../dragon/helper')

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
    authenticatedAccount({ sessionString })
        .then(({ authenticated })=>{ res.json({ authenticated })
        }).catch(error => next(error)); 
})

router.get('/dragons', (req, res, next) =>{
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account })=>{
            return AccountDragonTable.getAccountDragons({
                accountId: account.id
            })
        }).then(({ accountDragons })=> {
            return Promise.all(
                accountDragons //could be changed to return 10 at a time
                    .map(accountDragon => getDragonWithTraits({dragonId: accountDragon.dragonId}))
        )}).then(dragons => res.json({ dragons }))
        .catch(error => next(error)); 
})
module.exports = router;