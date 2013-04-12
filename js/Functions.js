$("#skipButton").click(function() {
    getQuestion(1);
});

$("#continueTrueButton").click(function() {
    getQuestion(2);
});
$("#continueFalseButton").click(function() {
    getQuestion(1);
});

$("#antwoordButton").click(function() {
    currentQuestionView.eval();
})