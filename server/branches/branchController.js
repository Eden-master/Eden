'use strict';

const Branch = require('./branchModel');
const messageController = require('./../messages/messageController.js')

/* We don't REALLY have branch functionality up and running yet. Have fun!
 */
module.exports = {
	getBranch: function(request, response) {

	},

	createBranch: function(request, response, next) {
		Branch.sync().then(function(){
      const BranchInfo = {
        newBranchID: request.body.newBranchID,
        oldBranchID: request.body.oldBranchID,
      };
			Branch.create(BranchInfo);
      request.query.branch_id = request.body.newBranchID;
      request.query.username = request.body.username;
      request.query.fromNewChatBranch = true;
      next();
		});
	},
}
