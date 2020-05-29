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

// get details for specific employee
exports.getEmpDetails =  async (req, res) => {
    var form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        let emp = fields.emp;
        let employeeData = await Employee.find({ name: emp });
        res.send(employeeData);
    });
};

// Get All employee details
exports.getAllEmpDetails =  async (req, res) => {
    try{
    let employeeData;
    employeeData = await Employee.find({});
    res.send(employeeData);
    }
    catch(e){
        logger.error(e);
    }
};


exports.onsubmit = async(req,res) => {
    var form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
        console.log(fields);
        res.send(fields);
    });
};