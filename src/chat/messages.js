import React from 'react';
import Message from './message'

const Messages = (props) => {

  const renderMessages = () => {
    let messageList = props.messages.map((message, i) => {
      // [{name: Joe Bloggs, chatMessage: 'some message'}, 'John joined the chat', {name: me, chatMessage: 'my message'}]
      return <Message key={i} message={message} />
    })
    return messageList
  }

  return(
    <div id="messageWindow">
      <ul>
        {renderMessages()}
      </ul>
    </div>
  );
}

export default Messages
