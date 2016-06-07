import React from 'react';
import Messages from './Messages';

function Chatbox(props) {
  return (
    <div>
      <Messages messages={props.messages} />
    </div>
  );
}

module.exports = Chatbox;
