teacherApp.controller("teacherCtrl",function($scope,teacherFact,$window){
$scope.addMode = true;
$scope.editMode = false;
$scope.selectedDeleteMode =false;
//Adding new question
$scope.add = function()
{
console.log(`The received data is ${$scope.quesNo} , ${$scope.ques} , ${$scope.opt1} , ${$scope.opt2} , ${$scope.opt3} , ${$scope.opt4} , ${$scope.rightAns} , ${$scope.marks}`);
teacherFact.addQues($scope.quesNo,$scope.ques,$scope.opt1,$scope.opt2,$scope.opt3,$scope.opt4,$scope.rightAns,$scope.marks);
resetAll();
viewAll();
};

//Marking Question Rows for deleting
$scope.deleteClick = function(event)
{
console.log("ID is :",event.srcElement.parentElement.parentElement.id);
var row = event.srcElement.parentElement.parentElement;
row.classList.toggle('selectedRow');
teacherFact.markForDelete(row.id);
//viewAll();
$scope.selectedDeleteMode =!$scope.selectedDeleteMode;

}


$scope.delete = function()
{
teacherFact.deleteRecords();
resetAll();
viewAll();
$scope.selectedDeleteMode =false;
}

$scope.editClick = function(event)
{
    console.log("------------------------",event.srcElement.parentElement.parentElement);
    var row = event.srcElement.parentElement.parentElement;
    console.log("The id is",row.id);
    var index = teacherFact.search(row.id);
    var editObj = teacherFact.getQuesObj(index);
    console.log("The searched object is :");
    console.log(editObj);

    $scope.quesNo = editObj.quesNo;
    $scope.ques = editObj.ques;
    $scope.opt1=editObj.option1;
    $scope.opt2=editObj.option2;
    $scope.opt3=editObj.option3;
    $scope.opt4=editObj.option4;
    $scope.rightAns = editObj.rightAnswer;
    $scope.marks = editObj.marks;
    
    $scope.editMode = true;
    $scope.addMode = false;
}


$scope.update = function()
{
   // var row = event.srcElement.parentElement.parentElement;
    
    var index = teacherFact.search($scope.quesNo);   //row.id=quesNo
   teacherFact.update(index,$scope.quesNo,$scope.ques,$scope.opt1,$scope.opt2,$scope.opt3,$scope.opt4,$scope.rightAns,$scope.marks);
    resetAll();
    viewAll();
    $scope.editMode = false;
    $scope.addMode = true;
}

//Function to reset all Input fields....
var resetAll = function()
{
    $scope.quesNo=teacherFact.lastQuesNo();
    $scope.ques='';
    $scope.opt1='';
    $scope.opt2='';
    $scope.opt3='';
    $scope.opt4='';
    $scope.rightAns='';
    $scope.marks='';

}


//Function to Refresh and print all Questions...
var viewAll= function()
{
    $scope.allQuestions = teacherFact.getQuesList();
    console.log($scope.allQuestions);
}

$scope.submit = function(){
    $scope.saveLocal();
    var promise = teacherFact.submitToServer();
    promise.then((data)=>{
        console.log("Received the response now ",data.data);
        $window.location.href = "../../saved.html";
        
    },(error)=>{
        console.log("Some error occured...No response received for saving into DB!")
    }); 
}

$scope.reset = function(){
    resetAll();
}

$scope.deleteAll = function()
{
teacherFact.deleteList();
$scope.saveLocal();
viewAll();
}

$scope.sort=function()
{
teacherFact.sortByMarks();
}

$scope.saveLocal =function()
{
    console.log("Trying to save....I have the List");
    console.log(teacherFact.getQuesList());
    localStorage.clear();
    localStorage.setItem('myQuestions',JSON.stringify(teacherFact.getQuesList()));
    console.log("Saved according to me");
}

$scope.fetchLocal = function()
{
    teacherFact.initializeList(JSON.parse(localStorage.getItem('myQuestions')));
    viewAll();
    resetAll();
}


});