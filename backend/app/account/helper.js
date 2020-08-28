const SHA256 = require('crypto-js/sha256');

const APP_SECRET = '@892*~$#$@28$'; //would be hidden in a real app in /secrets which is gitignored

const hash = string => {
    return SHA256(`${APP_SECRET}${string}`).toString();
}

module.exports = { hash }