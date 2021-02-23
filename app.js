const express = require('express')
const verifyPassword = require('./authenticate')
const https = require('https');
const fs = require('fs');
const app = express()

const port = 80;
var key = fs.readFileSync(__dirname + '/server.key');
var cert = fs.readFileSync(__dirname + '/server.cert');
var options = {
  key: key,
  cert: cert
};

// Attempt to verify user password and return result to Okta
app.post("/passwordImport", async (request, response) => {
    console.log("checking password for the user:", request.body.data.context.credential.username); // for separation of logs during testing
     verifyPassword(request.body.data.context.credential, function(success, error){
        if(success){
            console.log('Password is valid for ' + request.body.data.context.credential['username'] + ": " + "VERIFIED");
            var returnValue = { "commands":[
                                { "type":"com.okta.action.update",
                                  "value":{ "credential": "VERIFIED" } }
                          ]}
            response.send(JSON.stringify(returnValue));
        } else {
            console.log('Password is invalid for ' + request.body.data.context.credential['username'] + ": " + "VERIFIED");
            response.status(204).end();
        }
       
    });
    
  })

  app.get("/", async (request, response) => {
      let credential = {
          "username" : "*********",
          "password" : "*********"
      };
     verifyPassword(credential, function(success, error){
        if(success){
            console.log('Password for ' + credential['username'] + ": " + "VERIFIED");
            var returnValue = { "commands":[
                                { "type":"com.okta.action.update",
                                  "value":{ "credential": "VERIFIED" } }
                          ]}
            response.send(JSON.stringify(returnValue));
        } else {
            response.status(204).end();
        }
       
    });
    
  })

  //var server = https.createServer(options, app);
  app.listen(port, () => {
    console.log("server starting on port : " + port)
  });