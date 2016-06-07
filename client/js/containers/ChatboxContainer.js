import React from 'react';
import request from 'browser-request';
import Chatbox from '../components/Chatbox';
import SubmitMsg from '../components/SubmitMsg';

class ChatboxContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      bannerID: 'main',
      inputText: ''
    }

    this.getData = this.getData.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    request(this.props.url + '/messages?branch_id=' + this.state.bannerID, (err, res, body) => {
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
        branch_id: this.state.bannerID
      });
      
      this.setState({inputText: ''});

      request({method:'POST', url: this.props.url + '/messages?branch_id=' + this.state.bannerID, body: objToSend, json:true}, on_response.bind(this));

      function on_response(err, res, body) {
        if (err) throw new Error(err);

        this.setState({messages: this.state.messages.concat([body])});
      }
    }
  }

  render() {
    return (
      <div>
        <Chatbox messages={this.state.messages}/>
        <SubmitMsg handleClick={this.handleKeyPress} text={this.state.inputText} update={this.updateText}/>
      </div>
    );
  }
}

module.exports = ChatboxContainer;
