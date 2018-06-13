require('dotenv').config();
const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , ctrl = require('./controller');

const {
    SERVER_PORT,
    CONNECTION_STRING
} = process.env

const app = express();

app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Yo yo yo from port: ${SERVER_PORT}`)
    });
});
