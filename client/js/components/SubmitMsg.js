import React from 'react';

function SubmitMsg(props) {
  return (
    <div>
      <input onKeyDown={props.handleClick} />
    </div>
  );
}

module.exports = SubmitMsg;
