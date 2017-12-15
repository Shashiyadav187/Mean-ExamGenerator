studentApp.controller("studentCtrl",function($scope,studentFact){
    //console.log("Controller entry");
    var currIndex = 0;
    var myQuestions;
    var promisedQuestions = studentFact.getQuestions();
    promisedQuestions.then((data)=>{
         myQuestions = data.data;
        $scope.currQues = myQuestions[currIndex];
    },(error)=>{
        console.log("error while resolving promise!!!");
    });

    $scope.timer = 20;
    var clock = window.setInterval(()=>{
        --($scope.timer); 
        $scope.$apply();
        if($scope.timer==0)
        {
            alert("SORRY MATE!!...Time's Up...Marked answers will be saved Automatically!");
            $scope.submit();
            
        }
        
    },1000);

    $scope.prevQues = function()
    {
        
        $scope.currQues.markedOption = $scope.myChoice;
       // console.log("*********************",myQuestions[currIndex].markedOption);
        if(currIndex==0){
        alert("There's nothing back there mate!");
        }
        else
        {
            --currIndex;
            $scope.currQues=myQuestions[currIndex];
            if($scope.currQues.markedOption!='')
            {
                $scope.myChoice=$scope.currQues.markedOption;
            }
        }
    }

    $scope.nextQues =function()
    {
    if(currIndex==(myQuestions.length - 1))
    {
        alert("That's all mate!");
    }
    else
    {
        $scope.currQues.markedOption = $scope.myChoice;
       // console.log("*********************",myQuestions[currIndex].markedOption);
        ++currIndex;
        $scope.currQues=myQuestions[currIndex];
        if($scope.currQues.markedOption!='')
        {
            $scope.myChoice=$scope.currQues.markedOption;
        }
    }
    }


    $scope.submit =function()
    {
        //to stop timer
        clearInterval(clock);

        //To mark the answer of current question in case the user submits without pressing the next or the previous buttons....
        $scope.currQues.markedOption = $scope.myChoice;
        
        var myResponse = {
            userId : $scope.userId,
            userAnswer : myQuestions
        };
        console.log("RESPONSE THAT IS BEING SUBMITTED ::" ,myResponse);
        studentFact.submitResponse(myResponse);

        var promise = studentFact.submitResponse(myResponse);
       promise.then((data)=>{
            //console.log("Received the response now ",data.data);
            //$window.location.href = "../../saved.html";
           console.log("received Response" , data);
            showResult(data);
            //$scope.result = data;
        },(error)=>{
           console.log("Some error occured...No response received for saving into DB!")
       });
    }


    var showResult = function(receivedData)
    {
        var eachQuesResult = receivedData.data.result;
        var score =receivedData.data.score;
        for(key in myQuestions)
        {
            if(eachQuesResult[key].status==true)
            {
                myQuestions[key].status=true;
            
            }
            else
            {
                myQuestions[key].status=false;
            }
        }
        
        $scope.score = score;
        $scope.result = myQuestions;
        console.log("After manipulation :::" ,myQuestions);
    }

});