'use strict';
//////////////////////////////////////////
//Modules:
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const  cookieParser = require('cookie-parser');
// const data = require('./database/controller/dbController');
const messageController = require('./messages/messageController');
const authentication = require('./oauthTwo.js');

///////////////////////////////////////////
//Middelware:
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/../client')));
app.use(bodyParser.json());

app.get('/oauth2', authentication.getAuthCode);
app.get('/oauth2callback', authentication.getTokenCode);
app.get('/messages', messageController.getMessages);
app.post('/messages', messageController.postMessages);


app.listen(3000, () => {
	console.log('listening on port 3000');
});
