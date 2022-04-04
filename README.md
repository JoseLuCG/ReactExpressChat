# ReactExpressChat

Tendrás que escribir tu propio frontend para participar en el chat.

* El archivo `./Insomnia.json` te permitirá comprobar el funcionamiento del backend sando el software [Insomnia](https://insomnia.rest/). Como podrás comprobar, todas las peticiones y respuestas usan JSON para codificar los datos.
* Una vez que te hayas hecho con el funcionamiento del backend a base de prueba y error, escribe algunas funciones en JavaScript que te permitan "hablar" al backend y manejar sus respuestas.

## Hands on code

1. En la carpeta `src/PoC` tienes un ejemplo de cómo probar el acceso a la API desde JavaScript. Tienes solucionado uno de los endpoint. Completa el fichero para conseguir una prueba de concepto cada uno de los endpoint desde JavaScript.
2. Cuando ya puedas comunicarte con la API desde JavaScript, diseña tu frontend de React para usar la API para chatear con tus compañeros:
    1. ¿Qué flujo seguirá la aplicación desde que se abre para usar la API?
    2. ¿Tendrá sólo una pantalla o varias?
    3. ¿Cómo será cada pantalla para mostrar los datos recibidos desde la API y recoger los datos para mandar a la misma?.
    4. Dibuja tus mockups.
    5. Identifica los componentes de React.
    6. Asocia los diferentes componentes con las diferentes tareas. ¿De qué se encargará cada componente?. ¿Qué datos recogerá y enviará?. ¿Qué datos recibirá y mostrará?.
    
Crea los componentes y pruebalos de uno en uno.
Disfruta de tu aplicación de chat.


Algunos ejemplos con los que empezar:

```js
/**
 * JSON GET
 */ 
async function get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

/**
 *  JSON POST
 */

async function post(url, data) {
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

/**
 * Create authorization token
 */

function authToken(id, secret) {
    // En autenticación Basic, usuario y contraseña se separan con ':'
    const authToken = `${id}:${secret}`;
    // Y se codifican en Base64
    const base64token = btoa(authToken);
    return `Basic ${base64token}`;
}

/**
 * GET con autenticación
 */
async function authGet(url, token) {
    const response = await fetch(
        url,
        { 
            headers: {
                Authorization: token
            }
        }
    );
    const data = await response.json();
    return data;
}

/**
 * POST con autenticación
 */
async function authPost(url, token, data) {
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

// Casos de uso sobre la API del ejemplo
const host = "http://loquesea.com/";
let data = "";

get(host+"/users/");

data = JSON.stringify({userName: "Dani", password: "abc123"});
post(url+"/login/", data);

const token = authToken("234234234234","abc123");
authGet(url+"/messages/", token});

data = JSON.stringify({content: "Tengo una cosa que no funciona."});
authPost(url+"/message/", token, data);
```