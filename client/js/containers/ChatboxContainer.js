import React from 'react';
import request from 'browser-request';
import Chatbox from '../components/Chatbox';
import SubmitMsg from '../components/SubmitMsg';

// const socket = io.connect('http://localhost:3000');

//contains all logic
class ChatboxContainer extends React.Component {
  constructor(props) {
    super(props);

    //messages will be the list of messages rendered onto the Chatbox component
    //branchID is the current branchID of the chatbox
    //inputText is for inputting a message to be added to messages
    this.state = {
      messages: [],
      branchID: this.props.branchID,
      inputText: ''
    }

    this.getData = this.getData.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.readCookie = this.readCookie.bind(this);
  }

  //gets messages from table that matches current branchID
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

  //event handler for input box
  handleKeyPress(e) {
    if (e.keyCode === 13) {
      const username = this.readCookie('username').split('%20').join('');

      let objToSend = JSON.stringify({
        username: username,
        message: this.state.inputText,
        branch_id: this.state.branchID
      });

      //revert inputText back to empty string
      this.setState({inputText: ''});

      //get updated table with message from input box
      request({method:'POST', url: this.props.url + '/messages?branch_id=' + this.state.branchID, body: objToSend, json:true}, on_response.bind(this));

      function on_response(err, res, body) {
        if (err) throw new Error(err);

        this.setState({messages: this.state.messages.concat([body])});
      }
    }
  }

  handleClick(e) {
    //the message clicked from the chatbox
    const branchID = e.target.textContent;
    const username = this.readCookie('username').split('%20').join('');

    let objToSend = JSON.stringify({
      username: username,
      newBranchID: e.target.textContent,
      oldBranchID: this.state.branchID
    });

    //receive new messages from table related to message clicked from chatbox
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

    //gets data from parent branch (renders parent's messages)
    request({method:'POST', url: this.props.url + '/back', body: objToSend, json:true}, on_response.bind(this));

    function on_response(err, res, body) {
      if (err) throw new Error(err);

      console.log('body', body);

      this.setState({
        messages: body[0],
        branchID: body[1]
      });
    }
  }

  readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  render() {
    //only renders back button if not in main branch
    let arrow;
    // var username = this.readCookie('username').split('%20');
    // console.log('username', username);
    // username = username[0] + ' ' + username[1];
    if (this.state.branchID !== 'main') {
      arrow = <button id="backButton" onClick={this.handleBack}>Back</button>
    }

    return (
      <div>
        {arrow}
        <Chatbox
          username="michael"
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
