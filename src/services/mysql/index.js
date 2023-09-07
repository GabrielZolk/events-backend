const mysqlServer = require('mysql');

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error);
    rejectFunction({ error: msg })
}

const authModule = require('./auth')({ connection, errorHandler })
const usersModule = require('./users')({ connection, errorHandler })
const contactsModule = require('./contacts')({ connection, errorHandler })
const tagsModule = require('./tags')({ connection, errorHandler })
const eventsModule = require('./events')({ connection, errorHandler })

module.exports = {
    users: () => usersModule,
    auth: () => authModule,
    contacts: () => contactsModule,
    tags: () => tagsModule,
    events: () => eventsModule
};