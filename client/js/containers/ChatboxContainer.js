import React from 'react';
import request from 'browser-request';
import Chatbox from '../components/Chatbox';
import SubmitMsg from '../components/SubmitMsg';

class ChatboxContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      bannerID: '1'
    }

    this.getData = this.getData.bind(this);
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

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      console.log(this.state.bannerID);
      let objToSend = JSON.stringify({
        username: 'werollin',
        message: e.target.value,
        branch_id: this.state.bannerID
      });

      request({method:'POST', url: this.props.url + '/messages?branch_id=' + this.state.bannerID, body: objToSend, json:true}, on_response);

      const on_response = (err, res, body) => {
        if (err) throw new Error(err);

        console.log('response', response);
      };
    }
  }

  render() {
    return (
      <div>
        <Chatbox messages={this.state.messages}/>
        <SubmitMsg handleClick={this.handleKeyPress} />
      </div>
    );
  }
}

module.exports = ChatboxContainer;
