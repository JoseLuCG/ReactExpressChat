
export const host = "https://web-develop-react-express-chat.herokuapp.com";
export let idUser = 1649067014480;
export let passUser = "abc123";

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
 export async function authGet ( url, id, password ) {
    const response = await fetch(
        url,
        { headers: {
            Authorization: authToken(id, password)
        }});
    const data = await response.json();
    return data;

}
/**
 * Get the messages of the backend.
 * Take the data and transform it in string,
 * then print in the window the data.
 */
export async function getMessages(yourUseState) {
    
    const message = await authGet ( host+'/messages/', idUser, passUser );
    yourUseState(JSON.stringify(message));
}

