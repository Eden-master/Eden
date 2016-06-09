import React from 'react';

function SubmitMsg(props) {
  return (
    <div>
      <input 
        onKeyDown={props.handleEnter} 
        value={props.text} 
        onChange={props.update} 
        placeholder="Type here..."
      />
    </div>
  );
}

module.exports = SubmitMsg;
