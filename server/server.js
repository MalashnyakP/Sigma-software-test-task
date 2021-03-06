const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');

require('dotenv').config();

const { configs: { DB_CONNECT_URL, PORT } } = require('./configs');
const {
    artPieceRouter, authRouter, basketRouter, galleryRouter, userRouter
} = require('./routers');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

mongoose.connect(DB_CONNECT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(cors(corsOptions));

app.use('/art', artPieceRouter);
app.use('/auth', authRouter);
app.use('/basket', basketRouter);
app.use('/gallery', galleryRouter);
app.use('/user', userRouter);
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
