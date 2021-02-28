import React from 'react'
import history from '../history'

const SignIn = (props) => {

  const input = React.createRef()

  const setUserName = () => {
    props.setName(input.current.value);
    history.push("/chat");
  }

  return(
    <div>
      <div id="signIn">
        <div id="mainTitle">Demo chat app</div>
        <div>Enter the name you want displayed in the chat window:</div>
        <input ref={input} placeholder='Enter your name'/>
        <button onClick={() => setUserName()}>Save</button>
      </div>
    </div>
  );
}

export default SignIn
