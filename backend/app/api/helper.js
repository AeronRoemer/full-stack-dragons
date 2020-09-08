const Session = require('../account/session.js');
const AccountTable = require('../account/table.js');
const { hash } = require('../account/helper.js');

const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject)=>{
        let session, sessionString;
        if (sessionId){
            sessionString = Session.sessionString({ username, id: sessionId});
            setSessionCookie({ sessionString, res });
            resolve({message: 'session restored'})
        } else {
            session = new Session({username});
            sessionString = session.toString();
            AccountTable.updateSessionId({
                sessionId: session.id,
                usernameHash: hash(username)
            }).then(()=>{
                setSessionCookie({ sessionString, res })
                resolve({message: 'session created'});  
            }).catch(error => reject(error)); 
        }
    })
}
const setSessionCookie = ({ sessionString, res }) =>{
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 36000000,
        //secure: true, //for https
        httpOnly: true, //for security - no client side JS to detect cookie info
    }); 
}
const authenticatedAccount = ({ sessionString }) => {
    return new Promise((resolve, reject) => {
        if  (!sessionString || !Session.verify(sessionString)){
            const error = new Error('Invaid Session');
            error.statusCode = 400;
            return reject(error);
        } else {
            const { username, id } = Session.parse(sessionString);
            
            AccountTable.getAccount({ usernameHash: hash(username)})
                .then(({ account }) => {
                    //checks if account session from 'get account' is equal to the session from the given username 
                    const authenticated = account.sessionId === id;
                    resolve({ account, authenticated })
                }).catch(error => reject(error)); 
        }
    })
}
module.exports = { setSession, authenticatedAccount };