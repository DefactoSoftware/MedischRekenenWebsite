$("#skipButton").click(function() {
    getQuestion(1);
});

$('#false').on('hidden', function () {
    resetQuestion(1);
});
$('#correct').on('hidden', function () {
    resetQuestion(2);
});


$("#antwoordButton").click(function() {
    console.log("CLICK ANTWOORD");
    currentQuestionView.eval();
})


$("#questions").ready(function() {
    //
});



