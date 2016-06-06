'use strict';

const user = require('./../../../config.js');

/* The following sequelize object is the persistent connection to the
 * database. When you require it in other files and store it to a variable
 * (we used 'db'), you can call sequelize functions on it (create, find, etc)
 */
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${user.userInfo}@localhost/${user.dbName}`);

/* This authenticate function runs a simple query (1+1) on the database
 * to make sure you're connected. It is asynchronous, and does not affect
 * the sequelize object created above.
 */
sequelize.authenticate().then( errors => {
	console.log('trying to authenticate with db');
  if (errors)
	  console.log(errors);
  else
    console.log('connected successfully! Happy chatting!');
	});

module.exports = sequelize;
