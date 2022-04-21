import { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Messages from './components/Messages/Messages';
import SendMessage from './components/SendMessage/SendMessage';
import Singin from './components/Singin/Singin';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrer, setRegistrer] = useState(false);
  const [dataUser, setDataUser] = useState({
    user: "",
    pass: "",
    id: 0
  });
  //Handlers:

  useEffect(
    ()=>{
      console.log(dataUser);
    },
    [dataUser]
  );

  return (
    <>
    {registrer && !loggedIn && <Singin/>}
    {!loggedIn && <Login buttonHandler={setLoggedIn} collectorData={setDataUser} registrered={setRegistrer}/>}
    {loggedIn && <div>
      <Messages id={dataUser.id} pass={dataUser.pass}/>
      <SendMessage id={dataUser.id} pass={dataUser.pass}/>
    </div>}
    </>
  );
}

export default App;
