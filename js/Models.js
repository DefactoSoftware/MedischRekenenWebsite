

var Question = function(question, answer, hint, theory) {
    this.question = question;
    this.hint = hint;
    this.answer = answer;
    this.theory = theory;
}

var Session = function(name) {
    this.score = ko.observable(0);
    this.name = ko.observable(name);
    this.secs = ko.observable();
    this.mins = ko.observable();

    this.getTime = ko.computed(function() {
        return 0;
    }, this);
}

var resetQuestion = function(type) {
    $("#antwoord").value = "";
    getQuestion(type);
}

var UserModel = function(name) {

    this.getTotal = function(){
        var x = 0;
        for(var i = 0; i< this.scores().length; i++) {
            x = x+this.scores()[i];
        }
        return x;
    }

    this.getTime = function() {
        var x = 0;
        for(var i = 0; i< this.time().length; i++) {
            x = x+this.time()[i];
        }
        var hours = Math.floor(x / (60 * 60));

        var divisor_for_minutes = x % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        if(seconds < 10){ seconds = "0" + seconds;}
        if(minutes < 10){ minutes = "0" + minutes;}
        if(hours < 10){ hours = "0" + hours;}
        return hours+":"+minutes+":"+seconds;
    }
    this.time= ko.observableArray([]);
    this.scores = ko.observableArray([]);
    this.name = name;



}

var ScoresViewModel = function() {
    this.users = ko.observableArray([]);

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

var createSession = function(name) {
    window.currentSession = new Session(name);
}

var CurrentQuestionView = function() {
    this.Question = ko.observable(new Question("","",""));
    this.unit = ko.observable("ml");

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
            window.currentSession.score(window.currentSession.score()+1);
        }
        else
        {
            $("#false").modal();
        }
    }
}


var currentSession = new Session("");
ko.applyBindings(currentSession);