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
<<<<<<< HEAD
const authentication = require('./oauthTwo.js');
=======
const branchController = require('./branches/branchController')
>>>>>>> 067ea97a6b5197b0826b7c6e8861219a2f6cbd49

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

<<<<<<< HEAD
=======
app.post('/branch', branchController.createBranch, messageController.getMessages);
app.post('/back', branchController.getPreviousBranch, messageController.getMessages);
app.get('/everything', branchController.getAllTheBranches);
>>>>>>> 067ea97a6b5197b0826b7c6e8861219a2f6cbd49

app.listen(3000, () => {
	console.log('listening on port 3000');
});
