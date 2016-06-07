'use strict';

const Message = require('./messageModel');

module.exports = {
	getMessages: function(request, response) {
    // let data = request.body;
    // branch_id
    // console.log('URL, dawg: ', request.url);
    // console.log('Params, dawg: ', request.query);
    let data = request.query;

		Message('message').sync().then(function(){
      Message('message').findAll({
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
    // console.log('MY BODYY: ', request.body);
		Message('message').sync().then(function(){
			return Message('message').create(request.body);
		});
	}
}
