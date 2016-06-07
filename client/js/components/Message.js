import React from 'react';

function Message(props) {
  return (
    <div>
      <li onClick={props.handleClick}>{props.message}</li>
    </div>
  );
}

module.exports = Message;
