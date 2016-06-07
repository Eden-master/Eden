'use strict';

const Sequelize = require('sequelize');
const db = require('../database/model/dbModel');

/* Branch Schema
 * Each branch is a row in this table, and will be created when a user clicks
 *   on a chat entry (the branch is looked up and recalled if one already
 *   exists for that entry)
 * Each branch has a parent branch, so that tree structures can be createdAt
 * A branch can have many children, so many branches may refer to the same
 *   parentId
 *
 * messageId: is a reference to the _id column in messages of the message that
 * was clicked to CREATE this branch.
 * parentId: is a reference to the _id column in THIS VERY TABLE, referring to
 *   the chat from whence this chat was spawned. parentId of a root chat is
     'null'
 */
const Branch = db.define('branch', {
	_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	newBranchID: {
		type: Sequelize.INTEGER
	},
	oldBranchID: {
		type: Sequelize.INTEGER
	}
});

module.exports = Branch;
