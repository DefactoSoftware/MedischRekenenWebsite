/*************************************************************************************************************************************************************************************************************************************
 *                                                                                                                                                                                                                                   *
 *                                                                                                                                                                                                                                   *
 *    API CALLS                                                                                                                                                                                                       *
 *                                                                                                                                                                                                                                   *
 *    This class is used to communicate with the REST API. There are methods which retrieve or send data from and to the API.                                                                                                        *
 *    Every call to the API has a callback method. Which is usually the name of the method with success in behind it.                                                                                                                *
 *                                                                                                                                                                                                                                   *
 *    Author: Marthyn Olthof                                                                                                                                                                                                         *
 *    (c) Defacto Automatisering 2013 - 2113                                                                                                                                                                                         *
 *                                                                                                                                                                                                                                   *
 *************************************************************************************************************************************************************************************************************************************/

var mr_api_url = "http://172.16.1.106/MR/Api/api/";
var mr_db_url = "https://api.mongolab.com/api/1/databases/medischrekenen/"
var mongo_key = "?apiKey=HnsYMVCfl5jfx0KzCqPBjfH_0Fks7sdW";
/*
 Method to do a GET request to the WCF service
 */
var callService = function(uri, successFunction) {
    "use strict";
    "doing ajax call";
    $.ajax({
        cache: true,
        url: uri,
        type: "GET",
        contentType: "application/javascript",
        dataType: "json",
        crossDomain: true,
        error: ajaxError,
        failure: ajaxError,
        success: successFunction
    });
};

/*
 Method to do a PUT request to the WCF service
 */
var putService = function(uri, data, successFunction){
    "use strict";
    $.ajax({
        type: 'PUT',
        url: uri,
        contentType : "application/json; charset=utf-8",
        data: JSON.stringify( data ),
        dataType: "json",
        crossDomain: true,
        error: ajaxError,
        failure: ajaxError,
        success: successFunction
    });
};

/*
 Method to do a POST request to the WCF service
 */
var postService = function(uri, data, successFunction){
    "use strict";
    $.ajax({
        type: 'POST',
        url: uri,
        contentType : "application/json; charset=utf-8",
        data: JSON.stringify( data ),
        dataType: "json",
        crossDomain: true,
        error: ajaxError,
        failure: ajaxError,
        success: successFunction
    });
};

/*
 Method to handle Ajax errors
 */
var ajaxError = function(data) {
     /* DEBUG CODE */
    console.log("Er is een probleem met de verbinding");
    console.log(data);
    console.log(data.getAllResponseHeaders());
    /* END DEBUG CODE */
};

var getQuestion = function(type) {
    console.log("Getting question");
    this.callService(mr_api_url + "question/" + type, getQuestionSuccess);
}

var getQuestionSuccess = function(data) {
    console.log(data)
    if(data !== null) {
        var obj = $.parseJSON(data);
        var q = new Question(obj.question, obj.answer, obj.hint, obj.theory);
        console.log(q);
        currentQuestionView.Question(q);
    }
}

var getFBUserName = function(userId) {
    console.log("tralalala");
    callService("https://graph.facebook.com/"+userId+"?fields=name", getFBUserNameSuccess);
}

var getFBUserNameSuccess = function(data) {
    if(data !== undefined || data != null) {
        var user = $.parseJSON(data);
        createSession(user.name);
    }
}

var sendScore = function (session) {
    stopChr();
    var obj = new Object();
    obj.name = session.name();
    obj.score = session.score();
    console.log($("#minutes").text() + $("#seconds").text());
    obj.time = (parseInt($("#minutes").text()) * 60) + parseInt($("#seconds").text());
    console.log(obj.time);
    if(session !== null || session !== undefined) {
        console.log(JSON.stringify(session));
        postService(mr_db_url + "collections/scores" + mongo_key, obj, sendScoreSuccess)
    }
}

var sendScoreSuccess = function(data) {
    console.log(data);
    currentSession = new Session();
    loadDiv("Home");

}

var loadScores = function() {
    callService(mr_db_url + "collections/scores" + mongo_key, loadScoresSuccess);
}

var sorteer = function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1, property.length - 1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

var loadScoresSuccess = function(data) {
    if(data !== null || data !== undefined) {
        console.log(data);
        scoresViewModel.users.removeAll();
        for(var i = 0; i < data.length; i++) {
            var x = scoresViewModel.containsUser(data[i].name);
            if(x > 0)
            {
                scoresViewModel.users()[x].scores().push(data[i].score);
                if(data[i].time !== null && data[i].time !== undefined) {
                    scoresViewModel.users()[x].time().push(data[i].time);
                }
            }
            else
            {
                var user = new UserModel(data[i].name);
                user.scores.push(data[i].score);
                if(data[i].time !== null && data[i].time !== undefined) {
                    user.time.push(data[i].time);
                }
                scoresViewModel.users().push(user);
            }
        }
    }
    ko.applyBindings(scoresViewModel);


}
