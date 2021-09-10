const express = require('express');
const router = require('./http/routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

app.listen(process.env.APP_PORT, () => {
    console.log(`Application running on http://localhost:${process.env.APP_PORT}`);
});