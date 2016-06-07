'use strict';

const Message = require('./messageModel');

module.exports = {
	getMessages: function(request, response) {
    // let data = request.body;
    // branch_id
    // console.log('URL, dawg: ', request.url);
    // console.log('Params, dawg: ', request.query);
    const data = request.query;

		Message(data.branch_id).sync().then(function(){
      Message(data.branch_id).findAll({
        where: {
          branch_id: data.branch_id
        },
        order: [
          ['createdAt', 'ASC']
        ]
      }).then(function(messages){
        // console.log('thurr be messages fromt he db: ', messages);
        response.send(messages);
      });
    });
	},

	postMessages: function(request, response) {
    const data = request.body;
		Message(data.branch_id).sync().then(function(){
			return Message(data.branch_id).create(request.body);
		});
	}
}
