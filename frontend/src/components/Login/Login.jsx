import { useState } from 'react';
import { login } from '../../apitools.mjs';
import './Login.css'


function Login({buttonHandler}) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const data = JSON.stringify({userName: user, password: pass});

    //Login hamlers:
    function changeUser(event){
        setUser(event.target.value);
    }
    function changePass(ev){
        setPass(ev.target.value);
    }
    //Functions:
    function clickLogin() {
        if (user !== "" && pass !== ""){
        login(data);
        buttonHandler(true);
        }else {
            window.alert("¡Debes registrarte para entrar!");
        }
    }

    return (
        <div className="loginContainer">
            <h1>Esto es el login.</h1>
            <input type="text" id="inputName" placeholder='Usuario' onChange={changeUser} />
            <input type="password" id="inputPass" placeholder='Contraseña' onChange={changePass} />
            <button className="enterButton" onClick={clickLogin} >Entrar</button>
        </div>
    );
}
export default Login;