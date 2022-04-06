export const host = "https://web-develop-react-express-chat.herokuapp.com";

/**
 * Create a authorization token.
 * @param {String} name - Name of user.
 * @param {String} password - Pass of user.
 * @returns Returns encoding auhorization.
 */
export function authToken(name, password) {
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
 export async function authGet ( url, token ) {
    const response = await fetch(
        url,
        { headers: {
            Authorization: token
        }});
    const data = await response.json();
    return data;

}
/**
 * Get the messages of the backend.
 * Take the data and transform it in string,
 * then print in the window the data.
 */
export async function getMessages(idUser, passUser,yourUseState) {
    const token = authToken(idUser, passUser);
    const message = await authGet ( host+'/messages/', token);
    yourUseState(JSON.stringify(message));
}
/**
 * Create a post with authorization.
 * @param {string} url - Url to send a petition.
 * @param {string} token - The authorization.
 * @param {string} data - The content of a message.
 * @returns 
 */
export async function authPost(url, token, data) {
    const response = await fetch(
        url,
        {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }
    );
    const responseData = await response.json();
    return responseData;
}
/**
 * Send a message.
 * @param {string} token - A token that send a message. 
 * @param {string} data - A content of the message.
 */
export async function sendMessage(token, data) {
    authPost(host+'/message/',token, data);
}


export async function post(url, data) {
    const response = await fetch(
        url,
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

export async function login(data) {
    const id = await post(host+'/login/', data);
    console.log(id);
}