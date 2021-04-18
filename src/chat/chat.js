import React, { useState, useEffect } from 'react'
import Messages from './messages'
import Typing from './typing'
import io from 'socket.io-client'

// const url = 'https://ajays-practice-web-server.herokuapp.com/'
let socket = '';

const url = 'http://localhost:8090';

const Chat = (props) => {

  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([]);
  const [currentMsg, setCurrentMsg] = useState('');
  const [user, setUser] = useState({id: null, name: props.name})
  const [usersTyping, setTyping] = useState([])
  const chatInput = React.createRef()

  useEffect(() => {
    // This will only fire when the connected state changes, this ensures the events are
    // only set up once when a connection has been established.
    if(socket !== ''){
      socket.on('joined', (chatMessage) => {
        setMessages((messages) => [...messages, chatMessage])
      })

      socket.on('chat message', (chatMessage) => {
        setMessages((messages) => [...messages, chatMessage])
      })

      socket.on('typing', (message) => {
        setTyping((usersTyping) => [...usersTyping, message])
      })

      socket.on('stoppedTyping', (id) => {
        setTyping((usersTyping) => usersTyping.filter(obj => obj.id !== id))
      })
    }
  },[connected])

  const connect = () => {
    // function for connecting to the server manually
    socket = io(url, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    })
    // On successfull connection, set the connection status to true,
    // add the user details to the user state and send the user details to the server.
    socket.on('connectionSuccess', (id) => {
      setConnected(true)
      setUser({...user, id: id})
      socket.emit('addUser', { id: id, name: user.name })
    })

  }

  const disconnect = () => {
    socket.close()
    socket = ''
    setConnected(false)
  }

  const handleMessageInput = () => {
    setCurrentMsg(chatInput.current.value)
    console.log("Sending typing: " + user.id + user.name)
    socket.emit('typing', user.id, user.name)
  }

  const sendMessage = () => {
    socket.emit('chat message', { name: user.name, chatMessage: currentMsg })
    setMessages((messages) => [...messages, { name: 'Me', chatMessage: currentMsg }])
    clearMessage()
  }

  const clearMessage = () => {
    setCurrentMsg('')
    chatInput.current.value = '';
  }

  const renderConnectionStatus = () => {
    return connected ? <span id="connected">Connected</span> : <span id="disconnected">Disconnected</span>
  }

  return(
    <div id="chatInputContainer">
      <div id="connectionHeader">Server connection status: {renderConnectionStatus()}</div>
      <button onClick={() => connect()} className="button-normal">Connect to server</button>
      <button onClick={() => disconnect()} className="button-normal">Disconnect from server</button>
      <Messages messages={messages}/>
      <Typing usersTyping={usersTyping}/>
      <div id="chatInputContainer">
        <input id="chatInput" ref={chatInput} placeholder='Enter your message here' onChange={() => handleMessageInput()} className="textInput"/>
        <button id="send" onClick={() => sendMessage()} className="button-normal">Send <i className="far fa-paper-plane"></i></button>
        <button id="clear" onClick={() => clearMessage()} className="button-normal">Clear</button>
      </div>
    </div>
  );

}

export default Chat
