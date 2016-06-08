'use strict';

const Sequelize = require('sequelize');
const db = require('../database/model/dbModel');

/* Message Schema
 * username: is the author of the message. We don't have a user system yet.
 * branch_id: refers to the _id collumn in the branches table - this would be
 *   the chat thread that this message belongs to
 * timestamp: is not really necessary as all squeslize tables automagically
 * get a "createdBy" and "createdAt" column that deals with timestamps
 */
const Message = (branch_id) => { return db.define(branch_id, {
	_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: Sequelize.STRING
	},
	message: {
		type: Sequelize.TEXT
	},
	branch_id: {
		type: Sequelize.STRING
	},
	timeStamp: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.fn('now')
	}
})};

module.exports = Message;
