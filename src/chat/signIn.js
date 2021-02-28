import React from 'react'
import history from '../history'

const SignIn = (props) => {

  const input = React.createRef()

  const setUserName = () => {
    props.setName(input.current.value);
    history.push("/chat");
  }

  return(
    <div id="signIn">
      <input ref={input} placeholder='Enter your name'/>
      <button onClick={() => setUserName()}>Save</button>
    </div>
  );
}

export default SignIn
