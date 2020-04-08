const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

// call model API
var apiPost = async (scoring_url, token, payload, loadCallback, errorCallback) => {
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);

	return "";
}

// NOTE: you must construct wmlToken based on provided documentation
const wmlToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlZXoiLCJyb2xlIjoiQWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJhZG1pbmlzdHJhdG9yIiwiY2FuX3Byb3Zpc2lvbiIsIm1hbmFnZV9jYXRhbG9nIiwibWFuYWdlX2luZm9ybWF0aW9uX2Fzc2V0cyIsIm1hbmFnZV9xdWFsaXR5IiwibWFuYWdlX2Rpc2NvdmVyeSIsIm1hbmFnZV9tZXRhZGF0YV9pbXBvcnQiLCJtYW5hZ2VfY2F0ZWdvcmllcyIsImF1dGhvcl9nb3Zlcm5hbmNlX2FydGlmYWN0cyIsIm1hbmFnZV9nb3Zlcm5hbmNlX3dvcmtmbG93IiwiYWNjZXNzX2NhdGFsb2ciLCJhY2Nlc3NfaW5mb3JtYXRpb25fYXNzZXRzIiwidmlld19xdWFsaXR5IiwiYWNjZXNzX3F1YWxpdHkiXSwic3ViIjoibGVleiIsImlzcyI6IktOT1hTU08iLCJhdWQiOiJEU1giLCJ1aWQiOiIxMDAwMzMxMDAyIiwiYXV0aGVudGljYXRvciI6ImRlZmF1bHQiLCJpYXQiOjE1ODU4ODY2NjAsImV4cCI6MTU4NTkyOTg2MH0.JjWPS0qRl9S7GhbWhUWdBETTHADlNEku889Q-4e1dPd4PV9GBfV5zld4C4J8bXSzRvezbcKvdKCOJuTLzJIm9jo57iMYzGs5CG-d71NeWW17LByiRadXmHWx1UCIwNuAvSDo2gf7afsVGRXEU_1xDY8PO8p_45YAiET6PU-wpRrDWeO7btyv20e9I7SEpnnwgcQCgmUNFfSL5lWq62pTo7eK36-Ar1LWYKYKfAjwKIfRZUhTcduBZHhGUfIIn3NQhgnLT9QuYvtnv3s2C-itrFhYYUgfr7mRfKmm9-VmuCPDUM-Mmm5xlEXzKwwoA7XQxAVNJ7fqY9RGfLyLnyQ_kg";

// NOTE: manually define and pass the array(s) of values to be scored in the next line
//const payload = '{"input_data": [{"fields": [array_of_input_fields], "values": [array_of_values_to_be_scored, another_array_of_values_to_be_scored]}]}';
//const payload = '{"fields": ["AVGHEARTBEATSPERMIN", "PALPITATIONSPERDAY", "CHOLESTEROL", "BMI", "AGE", "SEX", "FAMILYHISTORY", "SMOKERLAST5YRS", "EXERCISEMINPERWEEK"], "values": [[93, 22, 163, 25, 49, "F", "N", "N", 110]]}';
//const payload = '{"input_data": [{"fields": ["gender","SeniorCitizen","Partner","Dependents","tenure","PhoneService","MultipleLines","InternetService","OnlineSecurity","OnlineBackup","DeviceProtection","TechSupport","StreamingTV","StreamingMovies","Contract","PaperlessBilling","PaymentMethod","MonthlyCharges","TotalCharges"],"values": [["Female",0,"No","No",1,"No","No phone service","DSL","No","No","No","No","No","No","Month-to-month","No","Bank transfer (automatic)",25.25,25.25]]}]}';
const payload = '{"fields": ["gender","SeniorCitizen","Partner","Dependents","tenure","PhoneService","MultipleLines","InternetService","OnlineSecurity","OnlineBackup","DeviceProtection","TechSupport","StreamingTV","StreamingMovies","Contract","PaperlessBilling","PaymentMethod","MonthlyCharges","TotalCharges"],"values": [["Female",0,"No","No",1,"No","No phone service","DSL","No","No","No","No","No","No","Month-to-month","No","Bank transfer (automatic)",25.25,25.25]]}';
const scoring_url = "https://zen25-cpd-zen25.omid-cp4d-contact-me-fo-2bef1f4b4097001da9502000c44fc2b2-0001.us-south.containers.appdomain.cloud/v4/deployments/3b3fc807-dd6f-4c07-85d7-e3ff6a066f42/predictions";

// main()
;(async () => {
	await apiPost(scoring_url, wmlToken, payload, function (resp) {
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

})()
