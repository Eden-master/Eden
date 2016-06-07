'use strict';

/* This file no longer has a purpose.
 * No, seriously. Just delete it.
 */
const Sequelize = require('sequelize');
const db = require('../model/dbModel');

module.exports = function(){
 	db.sync({ logging: console.log, force: true })
		.then(() => console.log('back from sync'));
};
