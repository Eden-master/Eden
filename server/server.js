'use strict';
//////////////////////////////////////////
//Modules:
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// const data = require('./database/controller/dbController');
const messageController = require('./messages/messageController');
var google = require ('googleapis');

//////////////////////////////////////////
//Keys:
var OAuth2 = google.auth.OAuth2;
var _client_id = "561170070891-jf3eu2fdgh0cdrd9hr0481dqstd8vuds.apps.googleusercontent.com";
var _client_secret = "79QuJZocoy7l2wXOJN4MLJQI";
var _redirect_url = 'http://localhost:3000/oauth2callback';
var oauth2Client = new OAuth2(_client_id, _client_secret, _redirect_url);
google.options({auth:oauth2Client}); //set as global default
var plus = google.plus('v1');

///////////////////////////////////////////
//Middelware:
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/../client')));
app.use(bodyParser.json());

require('./oauthTwo');

function() {
	//everything I wrote
}
