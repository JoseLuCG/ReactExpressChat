import { useEffect, useState } from "react";
import { getMessages } from "../../apitools.mjs";
import './Messages.css'

function Messages ({id, pass}) {
    const [ messages, setMessages] = useState("");

    function updateMessages() {
        getMessages(id, pass, setMessages);
    }
    //Implements a counter to refresh the messages every second.
    useEffect(
        ()=>{
            setInterval(updateMessages, 1000)},
        []
    );
    return (
        <div className="messageContainer">
            <h1>Estos son los mensages.</h1>
            <div className="contentMessages">{messages}</div>
        </div>
    );
}
export default Messages;