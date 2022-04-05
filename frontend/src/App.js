import Login from './components/Login/Login';
import Messages from './components/Messages/Messages';
import SendMessage from './components/SendMessage/SendMessage';
import './App.css';

function App() {
  return (
    <>
    <Login/>
    <Messages id="1649152935663" pass="abc123"/>
    <SendMessage id="1649152935663" pass="abc123"/>
    </>
  );
}

export default App;
