teacherApp.factory("teacherFact",function($http,$q){
var obj = {
    quesList :[],
    addQues(quesNo,ques,option1,option2,option3,option4,rightAnswer,marks){
        
        var q = new Question(quesNo,ques,option1,option2,option3,option4,rightAnswer,marks);
        this.quesList.push(q);
        console.log(this.quesList);
    },
    getQuesList()
    {
        this.setQuestionNumbers();
        return this.quesList;
    },
    getQuesObj(index)
    {
    return this.quesList[index];
    },
    search(qno)
    {
       var index = this.quesList.findIndex((quesObj)=>{return quesObj.quesNo == qno}); 
       return index;
    },
    markForDelete(qno)
    {
        console.log(`**********` + qno);
        var i = this.search(qno);
        this.quesList[i].markForDelete = !this.quesList[i].markForDelete;
       
    },
    deleteRecords()
    {
        this.quesList = this.quesList.filter((quesObj)=>quesObj.markForDelete==false);
    },
    update(index,quesNo,ques,opt1,opt2,opt3,opt4,rightAns,marks)
    {
        this.quesList[index].quesNo=quesNo;
        this.quesList[index].ques=ques;
        this.quesList[index].option1=opt1;
        this.quesList[index].option2=opt2;
        this.quesList[index].option3=opt3;
        this.quesList[index].option4=opt4;
        this.quesList[index].rightAnswer=rightAns;
        this.quesList[index].marks=marks;
        
        
    },
    sortByMarks()
    {
        console.log("Entered in Sort Factory!!!");
        this.quesList.sort((first,second)=>{return(first.marks-second.marks)});
        this.setQuestionNumbers();
    },
    setQuestionNumbers()
    {
        for(let i=0;i<this.quesList.length;++i)
        {
            this.quesList[i].quesNo = i+1;
        }
    },
    lastQuesNo()
    {
        return this.quesList.length+1;
    },
    initializeList(list)
    {
        this.quesList=list;
    },
    deleteList()
    {
        this.quesList.splice(0,this.quesList.length);
    },
    submitToServer()
    {
        var deferedObj = $q.defer();

        console.log("Trying to send....");
        var res = $http.post("/submitQuestions",this.quesList).then((data)=>{
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