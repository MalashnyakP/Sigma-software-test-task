const express = require('express');
const mongoose = require('mongoose');

const { configs: { DB_CONNECT_URL, PORT } } = require('./configs');

require('dotenv').config();

mongoose.connect(DB_CONNECT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log('Listening to 5000');
});

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}
