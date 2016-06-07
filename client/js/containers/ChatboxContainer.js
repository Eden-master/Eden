import React from 'react';
import request from 'browser-request';
import Chatbox from '../components/Chatbox';
import SubmitMsg from '../components/SubmitMsg';

// const socket = io.connect('http://localhost:3000');

class ChatboxContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      branchID: 'main',
      inputText: ''
    }

    this.getData = this.getData.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    request(this.props.url + '/messages?branch_id=' + this.state.branchID, (err, res, body) => {
      this.setState({
        messages: JSON.parse(body)
      });
    });
  }

  updateText(e) {
    this.setState({inputText: e.target.value});
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      let objToSend = JSON.stringify({
        username: 'werollin',
        message: this.state.inputText,
        branch_id: this.state.branchID
      });

      this.setState({inputText: ''});

      request({method:'POST', url: this.props.url + '/messages?branch_id=' + this.state.branchID, body: objToSend, json:true}, on_response.bind(this));

      function on_response(err, res, body) {
        if (err) throw new Error(err);

        this.setState({messages: this.state.messages.concat([body])});
      }
    }
  }

  handleClick(e) {
    const branchID = e.target.textContent;

    let objToSend = JSON.stringify({
      username: 'We made it dad',
      newBranchID: e.target.textContent,
      oldBranchID: this.state.branchID
    });

    request({method:'POST', url: this.props.url + '/branch', body: objToSend, json:true}, on_response.bind(this));

    function on_response(err, res, body) {
      console.log(branchID);
      if (err) throw new Error(err);

      console.log('body from handleClick after clicking msg', body);

      this.setState({
        messages: body,
        branchID: branchID
      });
    }
  }

  handleBack(e) {
    let objToSend = JSON.stringify({
      currentBranchID: this.state.branchID
    });

    request({method:'POST', url: this.props.url + '/branch', body: objToSend, json:true}, on_response.bind(this));

    function on_response(err, res, body) {
      if (err) throw new Error(err);

      console.log('body', body);

      this.setState({
        messages: body[0],
        branchID: body[1]
      });
    }
  }

  render() {
    let arrow;
    if (this.state.branchID !== 'main') {
      arrow = <button onClick={this.handleBack}>Back</button>
    }

    return (
      <div>
        {arrow}
        <Chatbox
          branchID={this.state.branchID}
          messages={this.state.messages}
          handleClick={this.handleClick} />
        <SubmitMsg
          handleEnter={this.handleKeyPress}
          text={this.state.inputText}
          update={this.updateText} />
      </div>
    );
  }
}

module.exports = ChatboxContainer;
