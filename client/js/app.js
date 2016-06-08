import React from 'react';
import ReactDOM from 'react-dom';
import request from 'browser-request';
import ChatboxContainer from './containers/ChatboxContainer';
import Branch from './components/Branch';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      renderGUI: false,
      branchID: 'main'
    }

    this.handleVisualizeClick = this.handleVisualizeClick.bind(this);
    this.handleGUIClick = this.handleGUIClick.bind(this);
  }

  handleVisualizeClick() {
    this.setState({renderGUI: true});
  }

  handleGUIClick(e) {
    this.setState({renderGUI: false});
  }

  render() {
    let dedicatedView;

    if (!this.state.renderGUI) {
      dedicatedView =
        <div className='container'>
          <ChatboxContainer
            url="http://localhost:3000"
            branchID={this.state.branchID}
            handleVisualizeClick={this.handleVisualizeClick}/>
        </div>
    } else {
      // request("http://localhost:3000/everything", (err, res, body) => {
      //   dedicatedView = body;
      //   dedicatedView.map( (branch, index) => {
      //     render circle for each branch
      //   });
      // });
    }

    return (
      <div>
        {dedicatedView}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('content'));
