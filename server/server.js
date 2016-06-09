'use strict';
//////////////////////////////////////////
//Modules:
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const  cookieParser = require('cookie-parser');
const messageController = require('./messages/messageController');
const authentication = require('./oauthTwo.js');
const branchController = require('./branches/branchController')

///////////////////////////////////////////
//Middelware:
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/../client')));
app.use(express.static(path.join(__dirname + '/../node_modules')));
app.use(bodyParser.json());

app.get('/oauth2', authentication.getAuthCode);
app.get('/oauth2callback', authentication.getTokenCode);

app.get('/messages', messageController.getMessages);
app.post('/messages', messageController.postMessages);

app.post('/branch', branchController.createBranch, messageController.getMessages);
app.post('/back', branchController.getPreviousBranch, messageController.getMessages);
app.get('/everything', branchController.getAllTheBranches);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
