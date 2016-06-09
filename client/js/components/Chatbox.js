import React from 'react';
import Messages from './Messages';

function Chatbox(props) {
  return (
    <div>
      <div id="username">Welcome <b>{props.username}</b> to Eden.</div>
      <div id="branchID">{props.branchID + ' chat'}</div>
      <Messages
        messages={props.messages}
        handleClick={props.handleClick}
        branchID={props.branchID}/>
    </div>
  );
}

module.exports = Chatbox;
