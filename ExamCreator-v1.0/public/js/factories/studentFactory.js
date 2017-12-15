studentApp.factory("studentFact",($http,$q)=>
{
    var obj={
        getQuestions()
        {
            console.log("Factory running");
            var deferedObj = $q.defer();
            var questionsJSON = $http.get(jsonLinks.questionJSON).then((data)=>{
                deferedObj.resolve(data);
            },(error)=>{
                deferedObj.reject(error);
            });
            
            console.log("Received reply is " , deferedObj.promise);
            return deferedObj.promise;
        },

        submitResponse(userResponse)
        {
            var res = $http.post("/submitResponse",userResponse);

            var deferedObj = $q.defer();
           
                 console.log("Trying to send....");
               var res = $http.post("/submitResponse",userResponse).then((data)=>{
                 deferedObj.resolve(data);
                    },(error)=>{
                       deferedObj.reject(error);
                  });
                   console.log("Promise Sended acc to me ....!",deferedObj.promise);
                   return deferedObj.promise;
        }
    };
    return obj;
});