$("#skipButton").click(function() {
    getQuestion(1);
    animateBonus("1", "-")
    currentSession.score(currentSession.score()-1)
});

$('#false').on('hidden', function () {
    resetQuestion(1);
});
$('#correct').on('hidden', function () {
    resetQuestion(2);
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
})

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
    console.log("CLICK ANTWOORD");
    currentQuestionView.eval();
})


$("#questions").ready(function() {
    //
});



