import { config } from 'dotenv';
import express, { request } from 'express';
import cors from 'cors';

if (process.env.NODE_ENV !== 'production') config();

import {
    sqlCallback,
    findUser,
    insertUser,
    getUsers,
    findSource,
    insertMessage,
    getLastMessages,
} from "./db.mjs";

const app = express();
app.use(express.json());
app.use(cors());

// Nuestra nodelo de datos.
class User {
    constructor (name, password) {
        this.name = name;
        this.password = password;
        this.id = Date.now();
    }
}
class Message {
    constructor (source, content) {
        this.source = source;
        this.content = content;
        this.time = Date.now();
    }
}
const users = [];
const messages = [];

function decodeBasicToken(request) {
    const [ authType, b64token ] = request.headers.authorization.split(" ",2);
    const token = atob(b64token);
    return token.split(":",2);
}

function authMiddleware (request, response, next) {
    try {
        if ( ! request.headers.authorization ) {
            response.status(401);
            response.send(`Authentication requiered.`);
            return
        } else {
            const [ authType, b64token ] = request.headers.authorization.split(" ",2);
            if ( authType !== "Basic") {
                response.status(400);
                response.send(`Ùnknown authentication type: ${authType}`);
                return
            }
            const [ source, password ] = decodeBasicToken(request);
            findSource(source, password, (error, data)=>{
                if (error) {
                    console.error(error)
                    throw error;
                }
                if ( data ) {
                    next();
                } else {
                    response.status(401);
                    response.send('Unauthorized');
                    return
                }
            });
        };
    } catch (err) {
        response.status(500)
        response.send(err)
        return
    }
}

app.post('/login/', (request, response) => {
    try {
        const { userName, password } = request.body;
        if ( ! userName || ! password ) {
            response.status(400)
            response.send("Must provide 'userName' and 'password' JSON");
            return
        }
        findUser(userName, password, (error, data)=>{
            if (error) {
                console.error(error)
                throw error;
            }
            if ( data ) {
                response.status(401);
                response.send("Usuario ya registrado");
                return
            } else {
                const newUser = new User(userName, password);
                insertUser(newUser,sqlCallback);
                const json = JSON.stringify(newUser.id)
                response.send(json);
                return
            }
        });
    } catch (err) {
        response.status(500)
        response.send(err)
        return
    }
});

app.get('/users/', (request, response)=>{
    try {
        getUsers((error, data)=>{
            if ( error ) {
                console.error(error);
                response.status(500)
                response.send("Database error.")
                return
            }
            if ( data ){
                const json = JSON.stringify(data)
                response.send(json);
                return
            }
        });
    } catch (err) {
        response.status(500)
        response.send(err)
        return
    }
});
//BORRAR USERS
/*
app.delete('/users/', (request, response)=>{
    findUser(userName, (error, data)=>{
        if (error) {
            console.error(error);
            response.send("Datos no encontrados");
        }
        if 
    });

})
*/

app.post('/message/', authMiddleware, (request, response) => {
    try {
        const [ source ] =  decodeBasicToken(request)
        const { content } = request.body;
        if ( ! source || ! content ) {
            response.status(400)
            response.send("Must provide a valid authentication token and a 'content' JSON");
            return
        }
        const newMessage = new Message(source, content);
        insertMessage(newMessage);
        getLastMessages(1, (error, data)=>{
            if ( error ) {
                console.error(error);
                response.status(500)
                response.send("Database error.")
                return
            }
            if ( data ) {
                response.json(data);
                response.send();
                return
            }
        })
    } catch (err) {
        response.status(500)
        response.send(err)
        return
    }
});

app.get('/messages/', authMiddleware, (request, response) => {
    try {
        getLastMessages(15, (error, data)=>{
            if ( error ) {
                console.error(error);
                response.status(500)
                response.send("Database error.")
                return
            }
            if ( data ) {
                response.json(data);
                response.send();
                return
            }
        })
    } catch (err) {
        response.status(500)
        response.send(err)
        return
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on http://127.0.0.1:${process.env.PORT}`)
})