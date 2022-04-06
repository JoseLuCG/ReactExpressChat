import { useState } from 'react';
import { authToken, sendMessage } from '../../apitools.mjs';
import './SendMessage.css'
function SendMessage ({id, pass}) {
    const token = authToken(id, pass);
    const [message, setMessage] = useState("");
    const data = JSON.stringify({content: message});
    
    
    //Save the input text in message. 
    function receiveTextInput(ev){
        setMessage(ev.target.value)
    }
    //send the message.
    function sendHandler(){
        sendMessage(token, data);
    }

    return (
        <div className="sendConteiner">
        <h1>Esto es el imput de send message.</h1>
        <textarea onChange={receiveTextInput}></textarea>
        <button className="SendButton" onClick={sendHandler}>Enviar</button>
        </div>
    );
}
export default SendMessage;