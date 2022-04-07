import { useEffect, useRef, useState } from "react";
import { createhtmlElements, getMessages } from "../../apitools.mjs";
import './Messages.css'

function Messages ({id, pass}) {
    const [ messages, setMessages] = useState([]);
    const [ htmlMessages, setHtmlMessages ] = useState([]);
    const timer = useRef(0)

    function updateMessages() {
        getMessages(id, pass, setMessages);
    }

    //Implements a counter to refresh the messages every second.
    /* With this way only have a one counter.*/
    useEffect(
        ()=>{
            if (timer.current !=0) clearInterval(timer.current);
            timer.current = setInterval(updateMessages, 500)
        },
        []
    );
    useEffect(
        ()=>{
            const msg = createhtmlElements(messages);
            setHtmlMessages(msg);
        },
        [messages]
    );
    return (
        <div className="messageContainer">
            <h1>Estos son los mensages.</h1>
            <div className="contentMessages">{htmlMessages}</div>
        </div>
    );
}
export default Messages;