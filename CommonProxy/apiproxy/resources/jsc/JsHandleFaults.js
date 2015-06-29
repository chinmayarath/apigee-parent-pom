var faultName = context.getVariable("faultName");
var errorMessage = context.getVariable("exceptionName");
var errorDetail = context.getVariable("errorText");
var errorCode = context.getVariable("statusCode");
var errorId = context.getVariable("messageId");
var acceptHeader = context.getVariable("request.header.Accept");
var errorResponseType = "json";


 if( (errorMessage == null) || (errorMessage == "") ) {
	if (faultName == "InvalidAPICallAsNoApiProductMatchFound"){
		errorMessage = "Unauthorized";
		errorDetail = "Privacy verification failed - Invalid App Details";
		errorCode = "401";
		errorId = "POL0002";
	}
	else if (faultName == "invalid_access_token"){
		errorMessage = "Forbidden";
		errorDetail = "Privacy verification failed - Invalid Access Token";
		errorCode = "403";
		errorId = "POL0002";
	} 
	else if (faultName == "access_token_expired"){
		errorMessage = "Forbidden";
		errorDetail = "Privacy verification failed - Access Token Expired";
		errorCode = "403";
		errorId = "POL0002";
	}
	else if (faultName == "SpikeArrestViolation"){
		errorMessage = "Server Busy";
		errorDetail = "Service Error - System Has Exceeded Maximum Number of Permitted Requests";
		errorCode = "503";
		errorId = "SVC0001";
	}
	else if (faultName == "QuotaViolation"){
		errorMessage = "Server Busy";
		errorDetail = "Service Error - The client app has exceeded maximum number of permitted requests";
		errorCode = "503";
		errorId = "SVC0001";
	}
	 else if (faultName == "JsonPathParsingFailure"){
			errorMessage = "Bad Request";
			errorDetail = "Service Error - Invalid Json Body";
			errorCode = "400";
			errorId = "SVC0001";
		}
	 else if (faultName == "InvalidJSONPath"){
			errorMessage = "Bad Request";
			errorDetail = "Service Error - Invalid Json Body";
			errorCode = "400";
			errorId = "SVC0001";
		}
	 else if (faultName == "InvalidBasicAuthenticationSource"){
			errorMessage = "Unauthorized";
			errorDetail = "Service Error - Invalid Authorization";
			errorCode = "401";
			errorId = "SVC0001";
		}
	else if ((faultName == "") || (faultName == null)){
		errorMessage = "Internal Server Error";
		errorDetail = "Service Error - The server encountered an error while attempting to fulfill the request.";
		errorCode = "500";	
		errorId = "SVC0001";
	}
	else {
		errorMessage = "Internal Server Error";
		errorDetail = "Service Error - The server encountered an error while attempting to fulfill the request.";
		errorCode = "500";	
		errorId = "SVC0001";
	}
 }
 else if ( (!(errorMessage == null)) || (!(errorMessage == "")) )
 {
		errorMessage = errorMessage;
		errorDetail = errorDetail;
		errorCode = errorCode;	
		errorId = errorId;
 }

 if	((acceptHeader == "application/xml") ||(acceptHeader == "text/xml") ){
	 errorResponseType = "xml"; 
 }
 
context.setVariable("errorResponseType", errorResponseType);
context.setVariable("errorMessage",errorMessage);
context.setVariable("errorDetail",errorDetail);
context.setVariable("errorCode",errorCode);
context.setVariable("errorId",errorId);