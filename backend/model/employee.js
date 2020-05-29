var mongoose = require("mongoose");
var employeeschema = new mongoose.Schema ({
	name : String,
    assignedSurvey : Array,
    survey : Array
});

module.exports = mongoose.model("Employee",employeeschema);