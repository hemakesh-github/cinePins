const fs = require('fs')
const {google} = require('googleapis')
const apikeys = require('./apikey.json')

async function authorise(){
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}