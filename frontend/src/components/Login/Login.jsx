import './Login.css'


function Login() {


    return (
        <div class="loginContainer">
            <h1>Esto es el login.</h1>
            <input type="text" id="inputName" placeholder='Usuario' />
            <input type="text" id="inputPass" placeholder='Contraseña' />
            <button class="enterButton">Entrar</button>
        </div>
    );
}
export default Login;