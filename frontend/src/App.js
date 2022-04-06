import { useState } from 'react';
import Login from './components/Login/Login';
import Messages from './components/Messages/Messages';
import SendMessage from './components/SendMessage/SendMessage';
import Singin from './components/Singin/Singin';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [canSendMessages, setCanSendMessages] = useState(false);
  //Handlers:

  return (
    <>
    {!loggedIn &&<Login buttonHandler={setLoggedIn}/>}
    <Messages id="1649240014987" pass="abc123"/>
    <SendMessage id="1649240014987" pass="abc123"/>
    <Singin/>
    </>
  );
}

export default App;
