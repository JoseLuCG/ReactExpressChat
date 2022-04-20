import { useState } from "react";
import { getUsers } from "../apitools.mjs";

function Borrame(){
    const [users, setUsers] = useState(undefined);
    
    //Handlers
    function userGet(){
        const usersApi = getUsers();
        setUsers(usersApi)
    }

    return(
        <div>
            <h1>Estos son los users:</h1>
            <div>{users}</div>
            <button onClick={userGet}>User</button>
        </div>
    );
}
export default Borrame; 