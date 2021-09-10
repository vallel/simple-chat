const express = require('express');
const router = require('./http/router');
const db = require('./db');
require('dotenv').config();

const app = express();

db(process.env.DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

app.listen(process.env.APP_PORT, () => {
    console.log(`Application running on ${process.env.APP_HOST}:${process.env.APP_PORT}`);
});