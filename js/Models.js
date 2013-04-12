var Question = function(question, answer, hint, theory) {
    this.question = question;
    this.hint = hint;
    this.answer = answer;
    this.theory = theory;
}

var CurrentQuestionView = function() {
    this.Question = ko.observable(new Question("","",""));

    this.eval = function() {
        console.log("evaluating answer");
        var answer = document.getElementById("antwoord").value;
        console.log(answer+"ml" +" == "+this.Question().answer);
        console.log(answer+"ml" == this.Question().answer.trim());
        if(answer+"ml" == this.Question().answer.trim()) {
            $("#correct").modal();
        }
        else
        {
            $("#false").modal();
        }
    }
}

var currentQuestionView = new CurrentQuestionView();

ko.applyBindings(currentQuestionView);