import { useRef, useState } from 'react';
import { login } from '../../apitools.mjs';
import './Login.css'


function Login({buttonHandler, collectorData}) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const ID = useRef(0)
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
        let id = 0;
        if (user !== "" && pass !== ""){
            login(data).then( (id) => {
                buttonHandler(true);
                collectorData({id, user, pass});
            });
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