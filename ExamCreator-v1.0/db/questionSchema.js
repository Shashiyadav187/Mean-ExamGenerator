const connection = require("./connection");

var Schema = connection.Schema;

var quesSchema = new Schema({quesNo:Number,ques:String,option1:String,option2:String,option3:String,option4:String,marks:Number});
var quesModel = connection.model("myquestions",quesSchema);

module.exports = quesModel;

