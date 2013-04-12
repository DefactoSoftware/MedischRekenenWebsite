var Question = function(question, answer, hint, theory) {
    this.question = question;
    this.hint = hint;
    this.answer = answer;
    this.theory = theory;
}

var CurrentQuestionView = function() {
    this.Question = ko.observable(new Question("","",""));
    this.unit = ko.observable("");

    this.setUnit = function(unit) {
        console.log(unit);
        this.unit(unit);
    }

    this.eval = function() {
        console.log("evaluating answer");
        var answer = document.getElementById("antwoord").value;
        console.log(answer+this.unit() +" == "+this.Question().answer);
        console.log(answer+this.unit() == this.Question().answer.trim());
        if(answer+this.unit() == this.Question().answer.trim()) {
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