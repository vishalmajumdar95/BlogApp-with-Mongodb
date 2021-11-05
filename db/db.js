const mongodb = require('mongoose');
require('dotenv').config();

// Your DataBase Url
const url = process.env.DB_NAME

// Code for connect with mongodb
mongodb.connect(url, { useNewUrlParser: true })
const con = mongodb.connection

con.on('open', (err) => {
    if (err) {
        console.log(err)
    }
    console.log('connected....DB');
});

module.exports = con;