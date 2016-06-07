import React from 'react';
import ReactDOM from 'react-dom';
import ChatboxContainer from './containers/ChatboxContainer';

class Main extends React.Component {
  render() {
    return (
      <div>
        <div className='container'>
          <ChatboxContainer url="http://localhost:3000"/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('content'));
