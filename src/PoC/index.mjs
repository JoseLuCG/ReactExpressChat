const host = "https://web-develop-react-express-chat.herokuapp.com"
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#updateButton");
const htmlGetMessages = document.querySelector("#getMessages");
/**
 * Receives the array of objets wiht the data.
 * @param {*} url - Url of database.
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
 * Take the data and transform it in string.
 */
async function getUsers () {
    const users = await get(host+"/users/");
    htmlGetUsers.innerText = JSON.stringify(users);
};
/**
 * Get the messages of the backend.
 * Take the data and transform it in string.
 */
async function getMessages() {
    const messages = await get(host+"/messages/");
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

async function authGet ( url, id, password ) {
    const response = await fetch(
        url,
        { headers: {
            Authorization: authToken(id, password)
        }});
    const data = await response.json();
    return data;

}

function updateButtonClickHandler() {
    getUsers();
    getMessages();
}



htmlUpdateButton.addEventListener("click", updateButtonClickHandler)