const connection = require("./connection");

var Schema = connection.Schema;

var responseSchema = new Schema({userId:String,userAnswer:[{quesNo:Number,ques:String,option1:String,option2:String,option3:String,option4:String,marks:Number,markedOption:String}]});
var responseModel = connection.model("responses",responseSchema);

module.exports = responseModel;

