import React from 'react';
import Message from './Message';

function Messages(props) {
  const messages = props.messages.map( (msgObj, index) => {
    return <Message
            key={index}
            handleClick={props.handleClick}
            message={msgObj.message} />
  });

  return (
    <ul>
      {messages}
    </ul>
  );
}

module.exports = Messages;
