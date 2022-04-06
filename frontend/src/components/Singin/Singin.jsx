import './Singin.css'
function Singin(){
    
    return(
        <div className="singinContainer">
        <h1>Esto es el singin</h1>
        <p>Logueate.</p>
        <input type="text" placeholder='Usuario'/>
        <input type="password" placeholder='Constraseña' />
        <button>Acceder</button>
        </div>
    )
}
export default Singin;