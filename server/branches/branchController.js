'use strict';

const Branch = require('./branchModel');
const messageController = require('./../messages/messageController.js')

module.exports = {
  // when we want to traverse through our chat branches backwards
	getPreviousBranch: function(request, response, next) {

    // search in the branch table
    Branch.sync().then(function() {
      Branch.findAll({
        where: {
          newBranchID: request.body.currentBranchID,
        }
      }).then(function(results) {
        request.query.branch_id = results[0].oldBranchID;
        request.query.gettingPreviousBranch = true;
        next();
      });
    });
	},

  // when we click on a message and want to create a new chat branch
	createBranch: function(request, response, next) {
		Branch.sync().then(function() {

      Branch.findAll({
        where: {
          newBranchID: request.body.newBranchID,
        }
      }).then(function(results) {

        // if a chat branch doesn't exist, then create and store it 
        if (results.length === 0) {
          Branch.create(request.body);
          request.query.fromNewChatBranch = true;
        }

        // these are going to be evaluated in the messageController middleware
        request.query.branch_id = request.body.newBranchID;
        request.query.username = request.body.username;
        next();
		  });
	  });
  }
}
