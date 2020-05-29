const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/task1", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("database has been connected!");
    }
});


require('./routes/routes.js')(app);

// server at port 4000
app.listen("4000", (req, res) => {
    console.log("server is started at port 4000")
});