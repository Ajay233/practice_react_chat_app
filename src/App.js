import React, {useState} from 'react'
import {Router, Route} from 'react-router-dom'
import SignIn from './chat/signIn'
import Chat from './chat/chat'
import history from './history'

import './App.css';

function App() {

  const [name, setName] = useState('')

  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact render={() => <SignIn setName={setName}/>}/>
        <Route path="/chat" render={() => <Chat name={name}/>}/>
      </Router>
    </div>
  );
}

export default App;
