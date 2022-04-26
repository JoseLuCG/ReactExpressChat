import { useEffect, useRef, useState } from "react";
import { createhtmlElements, extractUsers, getMessages, transformTime, transformUserIdToUserName } from "../../apitools.mjs";
import './Messages.css'

function Messages ({id, pass}) {
    const [ messages, setMessages] = useState([]);
    const [ htmlMessages, setHtmlMessages ] = useState([]);
    const [ refrescUsers, setRefrescUsers ] = useState([]);
    const timer = useRef(0)
    // Handlers:
    function updateMessages() {
        getMessages(id, pass, setMessages);
    }
    async function updateUsers() {
        const users = await extractUsers()
        setRefrescUsers(users);
    }
    //Implements a counter to refresh the messages every second.
    /* With this way only have a one counter.*/
    useEffect(
        ()=>{
            if (timer.current !=0) clearInterval(timer.current);
            timer.current = setInterval(updateMessages, 500)
        },
        [id, pass]
    );
    /**
     * Transforms the array of messages to html elements. 
     */
    useEffect(
        ()=>{
            //Transform the time.
            const timeTransform = transformTime(messages);
            const userTransform = transformUserIdToUserName(timeTransform,refrescUsers)
            const messagesHtml = createhtmlElements(userTransform);
            setHtmlMessages(messagesHtml);
        },
        [messages]
    );

    useEffect(
        ()=>{
            updateUsers()
        },
        []
    );

    return (
        <div className="messageContainer">
            <h1>Estos son los mensages.</h1>
            <div className="contentMessages">{htmlMessages}</div>
        </div>
    );
}
export default Messages;