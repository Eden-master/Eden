const React = require('react');
const Banner = React.createClass ({
	render: function() {
		let currentBranch = this.props.branch;
		let msg = this.props.data;
		return (
			<ul className="banner">
				<li>{currentBranch}</li>
			</ul>
		);
	}
});

module.exports = Banner;
