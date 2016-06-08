'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// const data = require('./database/controller/dbController');
const messageController = require('./messages/messageController');
const branchController = require('./branches/branchController')

app.use(express.static(path.join(__dirname + '/../client')));
app.use(express.static(path.join(__dirname + '/../node_modules')));
app.use(bodyParser.json());

app.get('/messages', messageController.getMessages);
app.post('/messages', messageController.postMessages);

app.post('/branch', branchController.createBranch, messageController.getMessages);
app.post('/back', branchController.getPreviousBranch, messageController.getMessages);
app.post('/everything', branchController.getAllTheBranches);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
