'use strict';

const Message = require('./messageModel');

module.exports = {
	getMessages: function(request, response) {
    const data = request.query;

    // if we create a new chat branch
    if (data.fromNewChatBranch) {

      // the first message in the new chat branch is the message we click on in the old branch
      Message(data.branch_id).sync().then(function() {
        Message(data.branch_id).create({
          username: data.username,
          message: data.branch_id,
          branch_id: data.branch_id
        })
      })
    }

    // get all messages from a particular chat branch 
		Message(data.branch_id).sync().then(function(){
      Message(data.branch_id).findAll({
        where: {
          branch_id: data.branch_id
        },
        order: [
          ['createdAt', 'ASC']
        ]
      }).then(function(messages){
        if (data.gettingPreviousBranch) response.send([messages, data.branch_id])
        else response.send(messages);
      });
    });
	},

	postMessages: function(request, response) {
    const data = request.body;
		Message(data.branch_id).sync().then(function(){
			Message(data.branch_id).create(request.body).then(message => response.send(message));
		});
	}
}
