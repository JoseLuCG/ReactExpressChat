import Login from './components/Login/Login';
import Messages from './components/Messages/Messages';
import SendMessage from './components/SendMessage/SendMessage';
import './App.css';

function App() {
  return (
    <>
    <Login/>
    <Messages/>
    <SendMessage id="qweqwe" password="qweqwe"/>
    </>
  );
}

export default App;
