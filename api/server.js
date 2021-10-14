const express = require('express');
const mongoose = require('mongoose');

const { configs: { DB_CONNECT_URL, PORT } } = require('./configs');
const { authRouter, userRouter } = require('./routers');

require('dotenv').config();

mongoose.connect(DB_CONNECT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use(_errorHandler);

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
