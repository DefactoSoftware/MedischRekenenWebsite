$("#skipButton").click(function() {
    resetQuestion(Math.floor(Math.random()*6));
    animateBonus("1", "-")
    currentSession.score(currentSession.score()-1)
});

$('#false').on('hidden', function () {
    resetQuestion(Math.floor(Math.random()*6));
});

$('#hint').on('hidden', function() {
    animateBonus("1", "-");
});

$('#sessionModal').on('hidden', function () {
   getScore(currentSession.name(), newScoreSession);
});

$("#antwoord").bind("keypress", function(event) {
    if(event.which == 13) {
        event.preventDefault();
        if($("#antwoord").val() !== "") {
            currentQuestionView.eval();
        }
    }
});

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

var animateGoodAnswer = function() {
    $('#goodanswer').html("Goed antwoord!");
    $('#goodanswer').show(500);
    setTimeout(function() {$('#goodanswer').hide(500); }, 2000);

}

var animateBonus = function(amount, sign) {
    $('#textAnimate').html(sign+" "+amount);

    $('#textAnimate').animate({
        opacity: 'toggle'
    }, {
        duration: 1200,
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


$("#nameInput").bind("keypress", function(event) {
    if(event.which == 13) {

        if(($("#nameInput").val() !== "" && $("#nameInput").val() !== null && $("#nameInput").val() !== undefined)) {
            $("#sessionModal").modal('hide');
        }
    }
});

$("#antwoordButton").click(function() {
    currentQuestionView.eval();
})


$("#questions").ready(function() {
    //
});



