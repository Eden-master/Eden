'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Display = require('./components/chatController.js')

//var ChatWindow = require('./components/chat');
//var CalendarWindow = require('./components/calendar');

let App = React.createClass({
  render: function() {
    return (
      <div className="container">
      	<Display pollInterval={3000} url="http://localhost:3000/"/>
      </div>
    );
  }
});


ReactDOM.render(<App />, document.getElementById('content'));
