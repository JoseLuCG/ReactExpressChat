import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./chat.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chat database.');
});

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
`);

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        messages (
            time INTEGER PRIMARY KEY,
            source INTEGER NOT NULL,
            content TEXT NOT NULL,
            FOREIGN KEY ( source )
                REFERENCES users (id) 
                    ON DELETE CASCADE 
                    ON UPDATE NO ACTION
        )
`);

export function sqlCallback (error, data) {
    console.log("error:", error, "data:", data);
}

export function findUser ( name, password, callback ) {
    db.get(`
        SELECT id
        FROM users
        WHERE name = "${name}" AND password = "${password}"
        `,
        callback
    )
}

export function findSource ( source, password, callback ) {
    db.get(`
        SELECT id
        FROM users
        WHERE id = "${source}" AND password = "${password}"
        `,
        callback
    )
}

export function insertUser ( userObject, callback ) {
    const { id, name, password } = userObject;
    const sql = `
        INSERT INTO users (id, name, password)
        values (${id}, "${name}", "${password}");
    `;
    db.run(sql,callback);
}
//BORRAR USERS
/*
export function deleteUser (id, callback) {
    const del= `DELETE ${id} FROM ${users}`;
    db.run(del,callback);
}
*/
export function getUsers ( callback ) {
    db.all("SELECT id, name FROM users", callback);
}

export function insertMessage ( messageObject, callback) {
    const { source, content, time } = messageObject;
    const sql = `
        INSERT INTO messages (time, source, content)
        values (${time}, ${source}, "${content}");
    `;
    db.run(sql,callback);
}

export function getLastMessages (minutes, callback) {
    const afterTime = Date.now() - 60000 * minutes;
    db.all(`
        SELECT *
        FROM messages
        WHERE time >= ${afterTime}
        `,
        callback
    )
}


export default db;