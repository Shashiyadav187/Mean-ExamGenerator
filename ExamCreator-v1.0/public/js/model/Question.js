class Question
{
    constructor(quesNo,ques,option1,option2,option3,option4,rightAnswer,marks)
    {
        this.quesNo = quesNo;
        this.ques = ques;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 =option3;
        this.option4 = option4;
        this.rightAnswer = rightAnswer;
        this.marks = marks;
        this.markForDelete = false;
        this.markedOption='';
    }

}
