'use strict';

const Branch = require('./branchModel');

/* We don't REALLY have branch functionality up and running yet. Have fun!
 */
module.exports = {
	getBranch: function(request, response) {

	},
	postBranch: function(request, response) {
		Branch.sync().then(function(){
			return Branch.create(request.body);
		});
	}
}
