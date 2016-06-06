'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// const data = require('./database/controller/dbController');
const messageController = require('./messages/messageController');

app.use(express.static(path.join(__dirname + '/../client')));
app.use(bodyParser.json());

app.get('/messages', messageController.getMessages);
app.post('/messages', messageController.postMessages);

//app.post('/branch' zomgBranchMethodz!);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
