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


var skipQuestion = function() {
    resetQuestion(Math.floor(Math.random()*6));
    bonus('1', '-');
}

var switchDevMode = function() {
    if(mr_api_url.substr(mr_api_url.length-4) === "dev/") {
        mr_api_url = mr_api_url.substr(0, mr_api_url.length-4);
        $("#devmode").css("font-style", "normal");
        $("#devmode").css("color", "black");
    }
    else {
        mr_api_url = mr_api_url + "dev/";
        $("#devmode").css("font-style", "italic");
        $("#devmode").css("color", "red");
    }
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

var animateMessage = function(element) {
    //$(element).html("Goed antwoord!");
    $(element).hide(0);
    $(element).show(500);
    setTimeout(function() {$(element).hide(500); }, 5000);
}

/*******************************
 *     Key press bindings      *
 *******************************/

$("#antwoord").bind("keypress", function(event) {
    if(event.which == 13) {
        event.preventDefault();
        if($("#antwoord").val() !== "") {
            currentQuestionView.eval();
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
    if(event.which === 61) {
        if(currentQuestionView != undefined) {
            console.log("skipping question");
            skipQuestion();
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
    animateMessage('#hintMessage');
    bonus('1', '-');
})

$("#antwoordButton").click(function() {
    currentQuestionView.eval();
})

$('#sessionModal').on('hidden', function () {
    getScore(currentSession.name(), newScoreSession);
});

$("#questions").ready(function() {
    //
});



