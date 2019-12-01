//------------------------------------------------------------------------------
// Copyright 2016 IBM Corp. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();
var request = require( 'sync-request' );

// Paste your Watson Machine Learning service apikey and Instance ID here
var apikey = "QiGk9o_bHFo_TrCnR_lGuLEdw2Pd2gLFPNeQzMvJiDgX";
const mlInstanceId = "ce1c2b45-2918-465e-abcd-b23cec685b69";

// generate IAM token based on APIkey of Watson Machine Learning service
var IBM_Cloud_IAM_uid = "bx";
var IBM_Cloud_IAM_pwd = "bx";


// get ML token 
function getMLToken(iam_token, loadCallback) {

	var resp = request("POST",  "https://iam.bluemix.net/oidc/token", {
					headers : { "Content-Type"  : "application/x-www-form-urlencoded",
							"Authorization" : "Basic " + btoa( IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd ) },
					body    : "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey"
	} );

	/*
	var resp = request("POST",  "https://iam.bluemix.net/identity/token", {
		headers : { "Content-Type"  : "application/x-www-form-urlencoded",
				"Accept" : "application/json",
				"Authorization" : "Basic " + btoa( IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd ) },
		body    : "apikey=" + apikey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey"
	} );
	*/

	//console.log("111111111111111");
	iam_token = JSON.parse( resp.body )["access_token"];
	//console.log(iam_token);
	//console.log(resp);
	//console.log("###############");
	//console.log(JSON.parse(resp.body)["access_token"]);

	return iam_token;
}

// call model API
function apiPost(scoring_url, token, mlInstanceID, payload, loadCallback, errorCallback) {
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("ML-Instance-ID", mlInstanceID);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);

	return "";
}


// main()

var iam_token;

// get ML token
iam_token = getMLToken(iam_token, function (resp) {
	try {
		console.log("AAAAAAAAAAAAAA");
	} catch (ex) {
		// TODO: handle parsing exception
	}

	console.log("Token:");
	console.log(iam_token);
});

//console.log("ML TOKEN");
//console.log(iam_token);

const wmlToken = "Bearer " + iam_token;

// NOTE: manually define and pass the array(s) of values to be scored in the next line
const payload = '{"fields": ["AVGHEARTBEATSPERMIN", "PALPITATIONSPERDAY", "CHOLESTEROL", "BMI", "AGE", "SEX", "FAMILYHISTORY", "SMOKERLAST5YRS", "EXERCISEMINPERWEEK"], "values": [[93, 22, 163, 25, 49, "F", "N", "N", 110]]}';
const scoring_url = "https://us-south.ml.cloud.ibm.com/v3/wml_instances/ce1c2b45-2918-465e-abcd-b23cec685b69/deployments/073e1b8a-0bf2-46ad-af04-e6aed292a46c/online";

// call ML model API to get Target
apiPost(scoring_url, wmlToken, mlInstanceId, payload, function (resp) {
	let parsedPostResponse;
	try {
		parsedPostResponse = JSON.parse(this.responseText);
	} catch (ex) {
		// TODO: handle parsing exception
	}

	console.log("Scoring response");
	console.log(parsedPostResponse);
}, function (error) {
	console.log(error);
});

