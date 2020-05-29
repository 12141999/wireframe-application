var mongoose = require("mongoose");
var surveyschema = new mongoose.Schema ({
	name : String,
	assignedEmp : String
});

module.exports = mongoose.model("Survey",surveyschema);