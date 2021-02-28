import React, { useState, useEffect, useRef } from 'react'
import Messages from './messages'
import Typing from './typing'
import io from 'socket.io-client'
let socket = '';


const Chat = (props) => {

  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([]);
  const [currentMsg, setCurrentMsg] = useState('');
  const [userName, setUsername] = useState(props.name)
  const [usersTyping, setTyping] = useState([])
  const chatInput = React.createRef()

  useEffect(() => {
    if(socket !== ''){
      socket.on('joined', (chatMessage) => {
        setMessages((messages) => [...messages, chatMessage])
      })

      socket.on('typing', (message) => {
        console.log(usersTyping)
        // if(!usersTyping.includes(message)){
        //   setTyping((usersTyping) => [...usersTyping, message])
        // }
      })

      socket.on('chat message', (chatMessage) => {
        setMessages((messages) => [...messages, chatMessage])
      })
    }
  },[connected])

  const connect = () => {
    // function for connecting to the server manually
    socket = io('http://localhost:8090', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    })

    socket.on('connectionSuccess', (id) => {
      console.log("Connected to server")
      setConnected(true)
      console.log(id)
      socket.emit('addUser', { id: id, name: userName })
    })

  }

  const handleTyping = (usersTyping, message) => {
    console.log(usersTyping)
    console.log(usersTyping.includes(message))
    if(!usersTyping.includes(message)){
      setTyping((usersTyping) => [...usersTyping, message])
    }
  }

  const disconnect = () => {
    socket.close()
    socket = ''
    setConnected(false)
  }

  const handleMessageInput = () => {
    setCurrentMsg(chatInput.current.value)
    // How to remove the typing message when idle or when sending a message
    socket.emit('typing', userName)
  }

  const sendMessage = () => {
    socket.emit('chat message', { name: userName, chatMessage: currentMsg })
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
      <div>Server connection status: {renderConnectionStatus()}</div>
      <Messages messages={messages}/>
      <Typing usersTyping={usersTyping}/>
      <div>
        <input ref={chatInput} placeholder='Enter your message here' onChange={() => handleMessageInput()}/>
        <button onClick={() => sendMessage()}>Send</button>
        <button onClick={() => clearMessage()}>Clear message</button>
      </div>
      <button onClick={() => connect()}>Connect to server</button>
      <button onClick={() => disconnect()}>Disconnect from server</button>
    </div>
  );

}

export default Chat
