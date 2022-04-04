const host = "https://web-develop-react-express-chat.herokuapp.com"
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#updateButton");
const htmlGetMessages = document.querySelector("#getMessages");
const login = document.querySelector("#submit");
/**
 * Receives the array of objets wiht the data.
 * @param {String} url - Url of database.
 * @returns - Return the data in form of array of objetcts.
 */
async function get(url) {
    const response = await fetch(url);
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
 * Create a json with the data to transfer at backend.
 */
function newUserHandler () {
    const user = document.querySelector("#inputNombre");
    const pass = document.querySelector("#inputPass");
    const dataOject = { userName: user.value, password: pass.value};
    const data = JSON.stringify(dataOject);
    newUser(host, data);
}
/**
 * This fuction send a post to the backend, with the information
 * for login.
 * @param {String} url - The host and the rute of API.
 * @param {String} data - Objet in string of data of users. 
 * @returns - The object whith the data.
 */
async function newUser(url, data) {
    const response = await fetch(
        url+'/login/',
        {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    const responseData = await response.json();
    return responseData;

}

function updateButtonClickHandler() {
    getUsers();
    getMessages()
}



htmlUpdateButton.addEventListener("click", updateButtonClickHandler)

login.addEventListener("click", newUserHandler)