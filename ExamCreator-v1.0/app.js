const express = require("express");
const bodyParser = require("body-parser");
const questionDB = require("./db/questionOperations");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });


app.set('view engine','ejs');
app.set('views',__dirname+"/views");

app.post("/submitQuestions",(request,response)=>{
    console.log("THIS IS received in server...");
   // console.log(request.body);
    var quesList = request.body;
    questionDB.addQuesList(quesList,response);
});

app.get("/getQuestions",(request,response)=>{
    questionDB.getQuestions(response);
});

app.post("/submitResponse",(request,response)=>{
    var userResponse = request.body;
    console.log("Received Response" , userResponse);    
    questionDB.getResult(userResponse,response);

});

app.listen(1234,()=>{
    console.log("Server start....!");
});