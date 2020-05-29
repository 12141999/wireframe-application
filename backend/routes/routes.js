module.exports = (app) => {
    const getEmpDetails = require("../controllers/getEmpDetails");
    const upadteEmpDetails = require("../controllers/updateEmpDetails");


    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    // Get api's
    app.get('/getAllEmpDetails' , getEmpDetails.getAllEmpDetails);

    
    // Post api's
    app.post('/getEmpDetails', getEmpDetails.getEmpDetails);
    app.post('/onsubmit' , getEmpDetails.onsubmit);
    app.post('/updateEmpWithSurvey' , upadteEmpDetails.updateEmpWithSurvey);
    app.post('/removeSurvey' , upadteEmpDetails.removeSurvey);

}