let React = require('react');

let Message = React.createClass ({
	messageHandler: function() {
	   this.props.onClicky(this.props.index)
	},
	render: function() {
		let msg = this.props.data;

		return (
			<ul className="msg">
				<strong>{msg.author}</strong>
				<p onClick = {this.messageHandler}>{msg.message}</p>
			</ul>
		);
	}
});

module.exports = Message;
