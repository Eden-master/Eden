import React from 'react';
import Messages from './Messages';

function Chatbox(props) {
  return (
    <div>
      <div id="branchID">{props.branchID}</div>
      <Messages messages={props.messages} handleClick={props.handleClick}/>
    </div>
  );
}

module.exports = Chatbox;
