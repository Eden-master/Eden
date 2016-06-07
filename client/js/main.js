const React = require('react');
const ReactDOM = require('react-dom');
const Display = require('./components/chatController.js');

//const ChatWindow = require('./components/chat');
//const CalendarWindow = require('./components/calendar');

const App = React.createClass ({
  render: function() {
    return (
      <div className="container">
      	<Display pollInterval={3000} url="http://localhost:3000/"/>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
