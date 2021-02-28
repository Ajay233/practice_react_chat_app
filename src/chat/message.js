import React from 'react'

const Message = (props) => {

  const buildMessage = () => {
    if(typeof props.message !== 'object'){
      return(
        <div className="message connectionMessage">
          {props.message}
        </div>
      );
    } else if(props.message.name === 'Me'){
      return(
        <div className="message myMessages">
          <div>{props.message.chatMessage}</div>
        </div>
      );
    } else {
      return(
        <div className="message externalMessages">
          <div className="name">{props.message.name}</div>
          <div>{props.message.chatMessage}</div>
        </div>
      );
    }
  }

  return(
    <React.Fragment>
      {buildMessage()}
    </React.Fragment>
  );

}

export default Message;
