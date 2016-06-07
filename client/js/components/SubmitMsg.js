import React from 'react';

function SubmitMsg(props) {
  return (
    <div>
      <input onKeyDown={props.handleClick} value={props.text} onChange={props.update} />
    </div>
  );
}

module.exports = SubmitMsg;
