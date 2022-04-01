const host = "https://web-develop-react-express-chat.herokuapp.com"
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#updateButton");
const htmlGetMessages = document.querySelector("#getMessages");
const htmlForm = document.querySelector("form");
/**
 * Receives the array of objets wiht the data.
 * @param {String} url - Url of database.
 * @returns - Return the data in form of array of objetcts.
 */
async function get(url) {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}
/**
 * Get the users of the backend.
 * Take the data and transform it in string,
 * then print in the window the data.
 */
async function getUsers () {
    const users = await get(host+"/users/");
    htmlGetUsers.innerText = JSON.stringify(users);
};
/**
 * Get the messages of the backend.
 * Take the data and transform it in string,
 * then print in the window the data.
 */
async function getMessages() {
    const messages = await authGet ( host+'/messages/', 1648801787789, "abc123" );
    htmlGetMessages.innerText = JSON.stringify(messages);

}
/**
 * Create a authorization token.
 * @param {String} name - Name of user.
 * @param {String} password - Pass of user.
 * @returns Returns encoding auhorization.
 */
function authToken(name, password) {
    /*In Basic authorization: 
      user and password are separate with ":".*/
    const authToken = `${name}:${password}`;
    // And encoded in base64 it.
    const base64Token = btoa(authToken);
    return `Basic ${base64Token}`;
}
/**
 * Obtain the data with authorization.
 * @param {String} url - Url.
 * @param {Number} id - Id of user.
 * @param {String} password - Pass of user.
 * @returns 
 */
async function authGet ( url, id, password ) {
    const response = await fetch(
        url,
        { headers: {
            Authorization: authToken(id, password)
        }});
    const data = await response.json();
    return data;

}
/**
 * Obtains the user of the form.
 * @returns The user.
 */
function formUserSubmitHandler(ev){
    ev.preventDefault();
    const usuario =ev.target[0].value
    console.log(usuario)
    //return usuario;
}

function updateButtonClickHandler() {
    getUsers();
    getMessages()
}
//TODO // Obtaiin the pass and create the json to send the info for the backend, and with this log for the page.


htmlUpdateButton.addEventListener("click", updateButtonClickHandler)

htmlForm.addEventListener("submit", formUserSubmitHandler)