const express = require('express');
const app = express();
require('dotenv').config();
var cookieParser = require('cookie-parser');
const morgan = require('morgan')

require('./db/db')

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// userRouter
const userRouter = require('./Routes/user');
app.use('/users', userRouter);

// blogRouter
const blogRouter = require('./Routes/blog');
app.use('/blogs', blogRouter);

// likeDislikeRouter
const likeDislikeRouter = require('./Routes/like_dislike');
app.use('/likeDislikes', likeDislikeRouter);

// Get Home
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Server PORT
const PORT = process.env.PORT || 2022

// the port listener
var server = app.listen(PORT, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(host, port);
    console.log("Server is Successfully running......!")
});