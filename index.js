const express = require('express');
const app = express();

const server = require('http').Server(app);

const router = require('./http/router');
const socket = require('./socket');
const db = require('./db');
require('dotenv').config();

db(process.env.DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

socket.connect(server);

router(app);

server.listen(process.env.APP_PORT, () => {
    console.log(`Application running on ${process.env.APP_HOST}:${process.env.APP_PORT}`);
});