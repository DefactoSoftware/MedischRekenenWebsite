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

var api_url = "http://172.16.1.106/MR/Api/api/";

/*
 Method to do a GET request to the WCF service
 */
var callService = function(uri, successFunction) {
    "use strict";
    $.ajax({
        cache: true,
        url: api_url + uri,
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
 Method to do a POST request to the WCF service
 */
var postService = function(uri, data, successFunction){
    "use strict";
    $.ajax({
        type: 'POST',
        url: api_url + uri,
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
