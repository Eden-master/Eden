import React from 'react';

function Messages(props) {
  const messages = props.messages.map( (msgObj, index) => {
    return <li key={index} onClick={props.handleClick}>{msgObj.message}</li>
  });

  return (
    <ul>
      {messages}
    </ul>
  );
}

module.exports = Messages;
