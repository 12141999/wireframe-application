const express = require("express");
const app = express();
const mongoose = require('mongoose');
const winston = require('winston');
var bodyParser = require('body-parser');
const formidable = require('formidable');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

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


//logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: './logs/logs.log'
        })
    ]
}

const logger = winston.createLogger(logConfiguration);


// require models
let Employee = require("./model/employee");
let Survey = require("./model/survey");

// get details for specific employee
app.post("/getEmpDetails", async (req, res) => {
    var form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        let emp = fields.emp;
        let employeeData = await Employee.find({ name: emp });
        res.send(employeeData);
    });

});

app.post("/updateEmpWithSurvey", async (req, res) => {
    var form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        try{
        let emp = fields.emp;
        let surveyName = fields.survey;

        let query = [ { updateOne : {
            "filter" : { "name" : emp },
            "update" : { $pull: { survey: surveyName }}
         } },
         { updateOne : {
            "filter" : { "name" : emp },
            "update" : { $push : {assignedSurvey : surveyName}}
         } }];

       let upadteEmp = await Employee.bulkWrite(query);
        
        res.send(upadteEmp);
        }
        catch(e){
            logger.error(e); 
        }
    });

});

app.post("/removeSurvey" , async(req,res) => {
    var form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        try{
        let emp = fields.emp;
        let surveyName = fields.survey;

        let result = await Employee.updateOne({name : emp} ,
            { $pull: { assignedSurvey : surveyName }});
        
        res.send(result);
        }
        catch(e){
            logger.error(e);
            
        }
    });
})

app.post("/onsubmit" , async(req,res) => {
    var form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        console.log(fields);
        res.send(fields);
    });
})

app.get("/getAllEmpDetails", async (req, res) => {
    try{
    let employeeData;
    employeeData = await Employee.find({});
    res.send(employeeData);
    }
    catch(e){
        logger.error(e);
    }
});



// server at port 4000
app.listen("4000", (req, res) => {
    console.log("server is started at port 4000")
});