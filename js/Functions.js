/*************************************************************************************************************************************************************************************************************************************
 *                                                                                                                                                                                                                                   *
 *                                                                                                                                                                                                                                   *
 *    FUNCTIONS                                                                                                                                                                                                                      *
 *                                                                                                                                                                                                                                   *
 *    Animation and the binding of keypress and click events                                                                                                                                                                         *
 *                                                                                                                                                                                                                                   *
 *                                                                                                                                                                                                                                   *
 *    Author: Marthyn Olthof                                                                                                                                                                                                         *
 *    (c) Defacto Automatisering 2013 - 2113                                                                                                                                                                                         *
 *                                                                                                                                                                                                                                   *
 *************************************************************************************************************************************************************************************************************************************/

var clearMessages = function() {
    $("#hintMessage").hide();
    $("#goodanswer").hide();
    $("#wronganswer").hide();
}

var skipQuestion = function() {
    clearMessages();
    resetQuestion(Math.floor(Math.random()*4));
    bonus('1', '-');
    play("wrong1.mp3");
}

var answerQuestion = function() {
    clearMessages();
    currentQuestionView.eval();
}

var resetQuestion = function(type) {
    getQuestion(type);
}

var bonus = function(amount, sign) {
    animateBonus(amount, sign);
    if(sign === '+') {
        setTimeout(function() {currentSession.score(currentSession.score()+parseInt(amount)); sendScore(currentSession); }, 500);
    }
    else if (sign === '-') {
        setTimeout(function() {currentSession.score(currentSession.score()-parseInt(amount)); sendScore(currentSession); }, 500);
    }
}

var showHint = function() {
    animateMessage('#hintMessage', 20000);
    bonus('1', '-');
}


/*******************************
 *     Animation               *
 *******************************/
var animateBonus = function(amount, sign) {
    $('#textAnimate').html(sign+" "+amount);

    $('#textAnimate').animate({
        opacity: 'toggle'
    }, {
        duration: 300,
        complete: function() {
        }
    });
    $('#textAnimate').animate({
        width: 'toggle'
    }, {
        duration: 10,
        specialEasing: {
            width: 'linear',
            height: 'linear'
        }
    });
}

var animateMessage = function(element, time) {
    $(element).hide(0);
    $(element).show(500);
    if(time > 0) {
        setTimeout(function() {$(element).hide(500); }, time);
    }
    else {
        setTimeout(function() {$(element).hide(500); }, 5000);
    }
}

/*******************************
 *     Key press bindings      *
 *******************************/

$("#antwoord").bind("keypress", function(event) {
    if(event.which == 13) {
        event.preventDefault();
        if($("#antwoord").val() !== "") {
           answerQuestion();
        }
    }
});

$("#nameInput").bind("keypress", function(event) {
    if(event.which == 13) {

        if(($("#nameInput").val() !== "" && $("#nameInput").val() !== null && $("#nameInput").val() !== undefined)) {
            $("#sessionModal").modal('hide');
        }
    }
});

$("body").bind("keypress", function(event) {
    console.log(event.which);
    console.log($("#nameInput").is(":focus"));
    if(!$("#nameInput").is(":focus")){

        if(event.which === 61 || event.which === 43) {
            event.preventDefault();
            if(currentQuestionView != undefined) {
                console.log("skipping question");
                skipQuestion();
            }
        }

        if(event.which === 47 || event.which===104) {
            event.preventDefault();
            showHint();
        }
        if(event.which === 105) {
            event.preventDefault();
            $("#sessionModal").modal();
            setTimeout(function() {$("#nameInput").focus(); }, 300);
        }

    }
})

/*******************************
 *     Click bindings      *
 *******************************/

$("#skipButton").click(function() {
    skipQuestion();
});

$("#hintButton").click(function() {
    showHint();
})

$("#antwoordButton").click(function() {
    $("#hintMessage").hide();
    $("#goodanswer").hide();
    $("#wronganswer").hide();
    currentQuestionView.eval();
})

$('#sessionModal').on('hidden', function () {
    play("start");
    $("#antwoord").focus();
    getScore(currentSession.name(), newScoreSession);
});

$('#keyboardShortcutsModal').on('hidden', function () {
    $("#antwoord").focus();
});

$("#questions").ready(function() {
    //
});



