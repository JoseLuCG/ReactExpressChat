import { useState } from 'react';
import Login from './components/Login/Login';
import Messages from './components/Messages/Messages';
import SendMessage from './components/SendMessage/SendMessage';
import Singin from './components/Singin/Singin';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  //Handlers:

  return (
    <>
    {!loggedIn &&<Login buttonHandler={setLoggedIn}/>}
    {loggedIn && <Messages id="1649668629052" pass="abc123"/>}
    {loggedIn && <SendMessage id="1649668629052" pass="abc123"/>}
    <Singin/>
    </>
  );
}

export default App;
