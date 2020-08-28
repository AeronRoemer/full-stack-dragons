const Session = require('../account/session.js');
const AccountTable = require('../account/table.js');
const { hash } = require('../account/helper.js');

const setSession = ({ username, res }) => {
    return new Promise((resolve, reject)=>{
        const session = new Session({username});
        const sessionString = session.toString();
        AccountTable.updateSessionId({
            sessionId: session.id,
            usernameHash: hash(username)
        }).then(()=>{
            res.cookie('sessionString', sessionString, {
                expire: Date.now() + 36000000,
                //secure: true, //for https
                httpOnly: true, //for security - no client side JS to detect cookie info
            }); 
            resolve({message: 'session created'});  
        }).catch(error => reject(error)); 
    })
}

module.exports = {setSession};