import { useEffect, useState } from "react";
import { getMessages } from "../../apitools.mjs";
import './Messages.css'

function Messages () {
    const [ messages, setMessages] = useState("");

    function updateMessages() {
        getMessages(setMessages);
    }
    //Implements a counter to refresh the messages every second.
    useEffect(
        ()=>{
            setInterval(updateMessages, 1000)},
        []
    );
    return (
        <div class="messageContainer">
            <h1>Estos son los mensages.</h1>
            <div>{messages}</div>
        </div>
    );
}
export default Messages;