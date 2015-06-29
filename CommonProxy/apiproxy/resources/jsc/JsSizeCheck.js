/**
 * 
 */

var maxHeaderSize = 8192;
var maxContentSize = 2097152;
var maxRequestUriSize = 2048;
var exceptionName = "";
var messageId = "";
var errorText = "";
var variables = "";
var statusCode = "413";

var requestUri  = context.getVariable("proxy.url");
requestUriSize = requestUri.length;
if (requestUriSize > maxRequestUriSize) {
    statusCode = "414";
    exceptionName = "Request-URI Too Long";
    messageId = "SVC0001";
    errorText = "Service Error - Request URI Too Long";
    variables = "Request URI too long";
}
//context.setVariable("debug",requestUriSize);

clientRequestPayload = context.getVariable("message.content");
clientRequestPayloadSize =  clientRequestPayload.length;

if (clientRequestPayloadSize > maxContentSize) {
    exceptionName = "Request Entity Too Large";
    messageId = "SVC0001";
    errorText = "Service Error - Message Too Long";
    variables = "Message Too Long";
    statusCode = "413";
}
//context.setVariable("debug",clientRequestPayloadSize);

var headerSize = 0;
context.setVariable("debugrequest.headers",request.headers);
/*for(var header in request.headers){
	headerVal = context.getVariable('request.header.'+header+'.values');
  	context.setVariable("debugVal",headerVal);
  	headerVal = headerVal+"";
  	//headerVal = JSON.parse(headerVal);
  headerValAarry = headerVal.split(",");
  	for (i= 0; i<headerValAarry.length;i++)
    {
 
  		headerSize = headerSize + headerValAarry[i].length;
  		context.setVariable("debugNAME",header);
  		context.setVariable("debugSIZE",headerSize);
  
  	}
}*/

headerSize = request.headers+"";
headerSize = headerSize.length;

if (headerSize > maxHeaderSize) {
    exceptionName = "Request Entity Too Large";
    messageId = "SVC0001";
    errorText = "Service Error - Header Too Long";
    variables = "Header Too Long";
    statusCode = "413";
}

//context.setVariable("debug",headerSize);


if(exceptionName != "")
	{
    context.setVariable("exceptionName",exceptionName);
    context.setVariable("messageId",messageId);
    context.setVariable("errorText",errorText);
    context.setVariable("variables",variables);
    context.setVariable("statusCode",statusCode);
    //context.setVariable("newExceptionFlow",true);
    throw exceptionName;
}
