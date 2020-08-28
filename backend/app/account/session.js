const { v4: uuidv4} = require('uuid'); //creates random unique idenifier. module organized by versions
const { hash } = require('./helper');

class Session{
    constructor({ username }){
        this.username = username;
        this.id = uuidv4();
    }
    toString(){
        const { username, id } = this;
        return Session.sessionString({ username, id });
    }
    static parse( sessionString ){
        const sessionData =  sessionString.split("|")
        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        }
    }
    static verify(sessionString){
        const {username, id, sessionHash} = Session.parse(sessionString);
        const accountData = Session.accountData({ username, id })
        return hash(accountData) === sessionHash;
    }
    static accountData({ username, id }){
        return `${username}|${id}`
    }
    static sessionString({ username, id }){
        const accountData = Session.accountData({ username, id });
        return `${accountData}|${hash(accountData)}`
    }
}
//debugging code 
// const foo = new Session({username: 'foo'});
// const fooString = foo.toString();
// console.log(Session.parse(fooString));
// console.log(Session.verify(fooString));
module.exports = Session;