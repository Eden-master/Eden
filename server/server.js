'use strict';

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
// const data = require('./database/controller/dbController');
const messageController = require('./messages/messageController');


app.use(express.static(path.join(__dirname + '/../client')));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.render('../client/index.html');
});

app.get('/messages', messageController.getMessages);
app.post('/messages', messageController.postMessages);

//app.post('/branch' zomgBranchMethodz!);

server.listen(3000);

module.exports = server;
