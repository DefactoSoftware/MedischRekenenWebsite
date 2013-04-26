/*************************************************************************************************************************************************************************************************************************************
 *                                                                                                                                                                                                                                   *
 *                                                                                                                                                                                                                                   *
 *    MODELS                                                                                                                                                                                                                         *
 *                                                                                                                                                                                                                                   *
 *    In this class you will find data models and view models.                                                                                                                                                                       *
 *                                                                                                                                                                                                                                   *
 *                                                                                                                                                                                                                                   *
 *    Author: Marthyn Olthof                                                                                                                                                                                                         *
 *    (c) Defacto Automatisering 2013 - 2113                                                                                                                                                                                         *
 *                                                                                                                                                                                                                                   *
 *************************************************************************************************************************************************************************************************************************************/

var answerOld = ko.observable();

var Question = function(question, answer, hint, theory) {
    this.question = question;
    this.hint = hint;
    this.answer = answer;
    this.theory = theory;
}

var Session = function(name, score) {
    this.score = ko.observable(score);
    this.name = ko.observable(name);
}

var UserModel = function(name) {
    this.name = name;
    if(name === "" || name === undefined){
        this.name = "John Doe";
    }
    this.score = ko.observable();
    this.number = ko.observable();

}

var ScoresViewModel = function() {
    this.users = ko.observableArray([]);

    this.sortList = function() {
        for(var i = 0; i< this.users().length; i++) {
            var min = i;

            for(var x = i+1; x<this.users().length; x++){
                if(this.users()[x].score() > this.users()[min].score()){
                    min = x;
                }
            }
            if(i !== min) {
                var temp = this.users()[min];
                this.users()[min] = this.users()[i];
                this.users()[i] = temp;
            }
        }

        for(var y = 0; y < this.users().length; y++){
            this.users()[y].number(y+1);
        }
    }

    this.containsUser = function(name) {
        for(var i = 0; i< this.users().length; i++) {
            if(this.users()[i].name === name) {
                return i;
            }
        }
    }
}

scoresViewModel = new ScoresViewModel();
ko.applyBindings(scoresViewModel);

var CurrentQuestionView = function() {
    this.Question = ko.observable(new Question("","",""));
    this.unit = ko.observable("ml");
    this.streak = 0;
    this.setUnit = function(unit) {
        this.unit(unit);
    }

    this.eval = function() {
        console.log("Evaluating answer");
        var answer = document.getElementById("antwoord").value;
        if(answer+this.unit() == this.Question().answer.trim() || answer.replace('.', ',')+this.unit() == this.Question().answer.trim()) {
            animateMessage("#goodanswer");
            play("goodanswer" + (Math.floor(Math.random()*3)+1));
            window.currentSession.score(window.currentSession.score()+10);
            this.streak++;
            resetQuestion(Math.floor(Math.random()*4));
        }
        else
        {
            play("wrong1");
            animateMessage("#wronganswer");
            resetQuestion(Math.floor(Math.random()*4));
            this.streak = 0;
        }
        if(this.streak >= 5) {
            window.currentSession.score(window.currentSession.score()+5);
            bonus("15", "+")
            setTimeout(function () { play("streak") }, 100)
            this.streak = 0;
        }

        $("#antwoord").val("");
        $("#continueTrueButton").focus();
        sendScore(currentSession);
    }
}

var currentSession = new Session("", 0);
ko.applyBindings(currentSession);