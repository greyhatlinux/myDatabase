const express = require('express');
const app = express();
const path= require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const model = require('./model.js');


mongoose.connect("mongodb+srv://webdev:1038818@cluster0-zscuv.azure.mongodb.net/usersdb?retryWrites=true", () => {
    console.log("DB connected");
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 5000;

app.post('/save', (req,res,next) => {
    console.log(req.body);

    const newUser = new model({
        email: req.body.email,
        password: req.body.password
    });

    newUser
        .save()
        .then((result) => {
            res.status(200).json({
                message: "User saved successfully",
                status: true
            });
        })
        .catch((err) => {
        console.log(err);
        throw err;
    });


});

// app.get('/', (req,res,next) => {
//     console.log("i am inside get /");
// });

// app.use('/save', (res, req, next) => {
//     console.log("I am a middelware");
// });

// app.post('/save',(req,res,next) => {
//     //console.log(res);
//     console.log(req.body);
//     console.log("hello world!");
//     res.send("something something");
// });


app.listen(port, function(){
   console.log("Server 1 running at port: "+ port);
});

