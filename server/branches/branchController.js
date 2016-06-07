'use strict';

const Branch = require('./branchModel');
const messageController = require('./../messages/messageController.js')

/* We don't REALLY have branch functionality up and running yet. Have fun!
 */
module.exports = {
	getBranch: function(request, response) {

	},

	createBranch: function(request, response, next) {
		Branch.sync().then(function() {
      Branch.findAll({
        where: {
          newBranchID: request.body.newBranchID,
        }
      }).then(function(results) {

        // only create a new branch if it doesn't already exist in our database
        if (results.length === 0) {
          const BranchInfo = {
            newBranchID: request.body.newBranchID,
            oldBranchID: request.body.oldBranchID,
          };
          Branch.create(BranchInfo);
          request.query.fromNewChatBranch = true;
        }
        request.query.branch_id = request.body.newBranchID;
        request.query.username = request.body.username;
        next();
		  });
	  })
  }
}
