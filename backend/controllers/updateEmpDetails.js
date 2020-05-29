const formidable = require('formidable');
const winston = require('winston');


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
let Employee = require("../model/employee");


exports.updateEmpWithSurvey = async (req, res) => {
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
};


exports.removeSurvey = async(req,res) => {
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
};


