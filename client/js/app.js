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
      branchID: 'main',
      listOfBranches: []
    }

    this.handleVisualizeClick = this.handleVisualizeClick.bind(this);
    this.handleGUIClick = this.handleGUIClick.bind(this);
  }

  handleVisualizeClick() {
    this.setState({renderGUI: true});
  }

  handleGUIClick(e) {
    console.log('e.target from handleGUIClick', e.target.textContent);
    this.setState({
      renderGUI: false,
      branchID: e.target.textContent
    });
  }

  render() {
    let dedicatedView;
    if (this.state.renderGUI) {
      dedicatedView =
        <div className='container'>
          <ChatboxContainer
            url="http://localhost:3000"
            branchID={this.state.branchID}
            handleVisualizeClick={this.handleVisualizeClick}/>
        </div>
    } else {
      request("http://localhost:3000/everything", (err, res, body) => {
        if (err) throw new Error(err);

        let temp;
        temp = JSON.parse(body);
        temp = temp.map( (branch, index) => {
          console.log('branch', branch);
          return <Branch branchID={branch} key={index} handleGUIClick={this.handleGUIClick} />
        });

        this.setState({listOfBranches: temp});
      });
    }

    return (
      <div>
        {this.state.listOfBranches}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('content'));
