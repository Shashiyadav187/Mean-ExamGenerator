const myQuestions = require('./questionSchema');
const myAnswers = require('./answersSchema');
const userResponseDB = require('./responseSchema');

var quesOperations = {
addQuesList(quesList,response)
{
    myQuestions.collection.drop();
    myAnswers.collection.drop();
    var success = 1;
    for(key in quesList)
    {
    
    myQuestions.create(quesList[key],function(error){
        if(error){
            success = 0;
        } 
        else{
            success = 1;
        }
    });
    myAnswers.create(quesList[key],function(error){
        if(error){
            success = 0;
        } 
        else{
            success = 1;
        }
    });
    if(!success)
    {
        response.send("Some problem in DB side...Cant add the question");
        break;
    }
    
    }
    console.log('*****************************************');
    response.send("Questions saved SuccessFully...."); 
  //  response.end();
},

getQuestions(response)
{
    myQuestions.find((error,docs)=>{
        if(docs.length>0)
        {
            response.json(docs);
        }
    });
},

getResult(userResponse,response){
  
userResponseDB.create(userResponse,function(error){
    if(error){
        response.send("Some problem in DB side...Cant add the question");
    } 
    else{ 
        console.log("Responses saved successfully!!!");
    }
});

    var userAnswers = userResponse.userAnswer;
    myAnswers.find((error,docs)=>{
        if(docs.length>0)
        {
            var correctAnswers =docs; 
            this.checkAnswers(userAnswers,correctAnswers,response);
        }
    });

},

checkAnswers(userAnswers,correctAnswers,response)
{
    console.log("----------------------User :",userAnswers.length);
    console.log("----------------------Correct :",correctAnswers.length);
    
    var score =0;
    var eachQuesResult = {};
    var result = [];
    var currentAns;

    for(key in userAnswers)
    {
        eachQuesResult = {};
        eachQuesResult.quesNo = userAnswers[key].quesNo; 
        console.log("CORRECT ANSWERS!!" , correctAnswers);
        correctAnswers.forEach(function(element) {
            if(element.quesNo==userAnswers[key].quesNo)
            currentAns=element;
        }, this);
        
        if(userAnswers[key].markedOption==currentAns.rightAnswer)
        {
            eachQuesResult.status = true;
            score+=userAnswers[key].marks;
        }
        else
        {
            eachQuesResult.status = false;
        }
    result.push(eachQuesResult);
    }

    console.log("final Marks::",score);

    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({'score':score,'result':result}));

}



}
module.exports = quesOperations;