import React from 'react';
import Chatbox from '../components/Chatbox';
import request from 'browser-request';

class ChatboxContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      bannerID: 'main'
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    request(
      this.props.url + '/messages?branch_id=' + this.state.bannerID, (err, res, body) => {
        this.setState({
          messages: JSON.parse(body)
        });
      });
  }

  render() {
    return (
      <div>
        <Chatbox messages={this.state.messages}/>
      </div>
    );
  }
}

module.exports = ChatboxContainer;
