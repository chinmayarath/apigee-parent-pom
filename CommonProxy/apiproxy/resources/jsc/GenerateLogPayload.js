

var headers = null;
var inboundRequestUri = context.getVariable("proxy.url");
var verb = context.getVariable("request.verb");

var payload = null;
var flow = context.flow;
var timestamp = context.getVariable('system.time');
var customVariables = context.getVariable('customVariables');
var errorMessage = null;
var responseHeaders = "";
var apiName = context.getVariable('apiproxy.name');
var orgName = context.getVariable('organization.name');
var envName = context.getVariable('environment.name');
var flowName = context.getVariable('current.flow.name');

var messageProcessorUUID = context.getVariable('system.uuid');
var usecaseId= context.getVariable('request.header.x-vf-ext-bp-id');
var msisdn =  context.getVariable('msisdn');
var countryCode = context.getVariable('countryCode');
 
context.getVariable('loadbalancing.targetserver');
context.getVariable('target.ip');
context.getVariable('target.port');
context.getVariable('targetserver.name');


var transactionId = getTranscationID();

 logData = {
	"transaction-id" : transactionId,
	"timestamp" : getTimeStamp(),
	"component" : "APIX",
	"server-name" : orgName,
    "service" : apiName,
	"env-name" : envName,
    "inbound-request-uri" : inboundRequestUri,
	"service-flow" :  flowName,
	"flow" : flow,
    "message-processor-uuid" : messageProcessorUUID
 }

	logData["api-product"]= context.getVariable("apiproduct.name");
    logData["caller-id"]= context.getVariable("developer.email");
	logData["caller-app"]= context.getVariable("developer.app.name");
	logData["caller-apikey"]= context.getVariable("client_id");
    logData["usecase-id"]= usecaseId;
    logData["msisdn"]= msisdn;
    logData["country-code"]= countryCode; 
    logData["customVariables"]= customVariables; 
 
switch (flow) {
case "PROXY_REQ_FLOW":
   
    logData["logpoint"]= "request-in";
    logData["headers"]= context.proxyRequest.headers;
	logData["payload"]= context.getVariable("request.content");
    logData["external-trace-id"]= context.getVariable("request.header.x-vf-ext-trace-id");
	logData["external-reference-id"]= context.getVariable("request.header.x-vf-ext-reference-id");
	break;
	
case "PROXY_RESP_FLOW":
    
    logData["logpoint"]= "response-out";
	logData["headers"]= context.proxyResponse.headers;
	logData["payload"]= context.getVariable("response.content");
    logData["status-code"]= context.getVariable("response.status.code");
    logData["status"]= context.getVariable("response.reason.phrase");
    context.setVariable("message.header.x-vf-trace-transaction-id", transactionId);

    break;
	
case "TARGET_REQ_FLOW":
    context.setVariable("request.header.x-vf-trace-transaction-id", transactionId);
	logData["logpoint"]= "request-out";
    logData["headers"]= context.targetRequest.headers;
	logData["payload"]= context.getVariable("request.content");
	break;
	
  case "TARGET_RESP_FLOW":
    
    logData["logpoint"]= "response-in";
    logData["outbound-url"]= context.getVariable("target.scheme")+"://"+context.getVariable("target.host") + ":" + context.getVariable("target.port") + context.getVariable("request.uri");
    logData["headers"]= context.targetResponse.headers;
	logData["payload"]= context.getVariable("response.content");
    logData["status-code"]= context.getVariable("response.status.code");
    logData["status"]= context.getVariable("response.reason.phrase");        
	break;
	
case "ERROR":
	
    logData["logpoint"]= "error";
    logData["headers"]= context.error.headers;
	logData["payload"]= context.getVariable("message.content");
    logData["error"]= context.getVariable("message.reason.phrase");
    logData["error-code"]= context.getVariable("message.status.code");
    logData["outbound-url"]= context.getVariable("target.scheme")+"://"+context.getVariable("target.host") + ":" + context.getVariable("target.port") + context.getVariable("request.uri");
    break;

}
 if (logData["payload"]){
       logData["message-size"]= logData["payload"].length;
 }
 
 
context.setVariable("logData", JSON.stringify(logData));

function addAttrbuteToLogPayload(key, value){
  if(key && value) {
  logData[key] = value;
  }
}

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};



function getTimeStamp(){

var d=new Date();
var n=d.toTimeString();     
var timezone = "+";

n = d.getTimezoneOffset()+"";
if (n > 0){
  timezone = "-"
}
n = n.substring(1);
var hours =  ("00"+(n / 60)).slice(-2) ;
var minutes = ("00"+(n % 60)).slice(-2);
timezone +=  hours+":"+minutes;

  return ("00"+(context.getVariable("system.time.year"))).slice(-4) + "-"
  +   ("00"+(context.getVariable("system.time.month"))).slice(-2) + "-"
  +   ("00"+(context.getVariable("system.time.day"))).slice(-2) + "T"
  +   ("00"+(context.getVariable("system.time.hour"))).slice(-2) + ":"
  +   ("00"+(context.getVariable("system.time.minute"))).slice(-2) + ":"
  +   ("00"+(context.getVariable("system.time.second"))).slice(-2) + ","
  +   ("00"+(context.getVariable("system.time.millisecond"))).slice(-3) 
  + timezone;
}


function getTranscationID(){
var transactionId = context.getVariable("requestUUIDToLog");
if (!transactionId) {
     transactionId = context.getVariable("request.header.x-vf-trace-transaction-id");
	 if (!transactionId)  
		transactionId = generateUUID();
     context.setVariable("requestUUIDToLog", transactionId);
}  
return transactionId;
}
