import React from 'react'

const Typing = (props) => {

  const renderWhosTyping = () => {
    let whosTyping = props.usersTyping.map((user, i) => {
      return <li key={i}>{user.message}</li>
    })
    return whosTyping
  }

  return(
    <div>
      <ul>
        {renderWhosTyping()}
      </ul>
    </div>
  );
}

export default Typing
