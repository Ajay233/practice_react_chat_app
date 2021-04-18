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
      <div>
        <div className="jumbotron">
          <div id="mainTitle">Demo chat app <i className="far fa-comments"></i></div>
          This is a demo chat app I made to try out using SocketIO for instant messaging.  (This is still a work in progress <i className="far fa-laugh-wink"></i>)
          <hr/>
          <div id="signInText">Enter the name you want displayed in the chat window and then click next to continue:</div>
          <div id="signIn">
            <input className="textInput" ref={input} placeholder='Enter your name or a display name'/>
            <button className="button-normal" onClick={() => setUserName()}>Next <i className="fas fa-arrow-circle-right"></i></button>
          </div>
        </div>
      </div>
      <div>
        The server for this app has been built using <i className="fab fa-node icon-medium"></i> and Express.
      </div>
    </div>
  );
}

export default SignIn
