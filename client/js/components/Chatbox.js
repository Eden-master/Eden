import React from 'react';
import Messages from './Messages';

function Chatbox(props) {
  return (
    <div>
      <div id="branchID">{props.branchID}</div>
      <div>Welcome {props.username} to Eden. Say my name.</div>
      <Messages
        messages={props.messages}
        handleClick={props.handleClick}
        branchID={props.branchID}/>
    </div>
  );
}

module.exports = Chatbox;
