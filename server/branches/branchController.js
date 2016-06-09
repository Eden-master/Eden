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
        // storing previous branch name in request object to be evaluated in messageController
        request.query.branch_id = results[0].oldBranchID;
        request.query.gettingPreviousBranch = true;
        next();
      });
    });
	},

  // when we want an array list of all existing branches
  getAllTheBranches: function(request, response) {
    Branch.sync().then(function() {
      Branch.findAll({
        attr: ["newBranchID"],
      }).then(function(results) {
        // results are an array of objects with info about the branchID, its parents, etc.
        response.send(
          results.map(function(branchInfo, index) {
            return {newBranchID: branchInfo.newBranchID, 
              oldBranchID: branchInfo.oldBranchID,
              pairNumber: index.toString(),
            };
          })
        )
      })
    })
  },

  // when we click on a message and want to create a new chat branch
	createBranch: function(request, response, next) {
		Branch.sync().then(function() {
      Branch.findAll({
        where: {
          newBranchID: 'main',
        }
      }).then(function (results) {
        if (results.length === 0) {
          Branch.create({
            newBranchID: 'main',
            oldBranchID: 'none',
            username: 'none',
          })
        }
      })

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
