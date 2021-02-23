const ActiveDirectory = require('activedirectory');
const config = require(__dirname + '/config.json');

const ADconfig = {
    url: config.ldapURL,
    baseDN: config.ldapBaseDN,
}
const ad = new ActiveDirectory(ADconfig);

 function verifyPassword (creds, callback) {
    ad.authenticate(creds['username'], creds['password'], function(err, auth) {
    if (err) {
        console.log('ERROR: '+JSON.stringify(err));
        callback(false, err)
    }
    
    if (auth) {
        callback(true, null)
    }
    else {
        callback(false, "Can't login and no error message");
    }
    });

}
module.exports =  verifyPassword;

