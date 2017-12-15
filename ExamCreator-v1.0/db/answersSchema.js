const connection = require("./connection");

var Schema = connection.Schema;

var ansSchema = new Schema({quesNo:Number,rightAnswer:String});
var ansModel = connection.model("myanswers",ansSchema);

module.exports = ansModel;

