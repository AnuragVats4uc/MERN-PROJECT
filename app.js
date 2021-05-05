const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

//to use config.env file
dotenv.config({ path: './config.env'});

//to use mongoose connection file
require('./db/conn');

// const User = require('./model/userSchema');

app.use(express.json());

//we link the router files to make our route easy
app.use(require('./router/auth'));

//define the port
const PORT = process.env.PORT || 5000;


app.get('/signin', (req,res) => {
    res.send('Hello from login server');
})

app.get('/signup', (req,res) => {
    res.send('Hello from registration server');
});

//3. step heroku

if(process.env.NODE_ENV = "production"){
    app.use(express.static("client/build"));
    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })

};


app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});