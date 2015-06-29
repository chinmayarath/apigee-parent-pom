var accept_header= context.getVariable("Accept");

exceptionName = "Invalid Accept Header";
messageId = "SVC0002";
errorText = "Invalid Input Value - Accept Header";
statusCode = "400";

if ((accept_header == '') || (accept_header == null) || !(accept_header) || (accept_header == "*/*") )
{
	context.setVariable("accept","json");
}
else if(accept_header){
 
accept_header = accept_header.toLowerCase();
  
if(accept_header.indexOf('application/json') == 0)
	  {
		context.setVariable("accept","json");
	  }
else if((accept_header.indexOf('application/xml') == 0) || (accept_header.indexOf('text/xml') == 0) )
  {
	context.setVariable("accept","xml");
  }
else
{
  	context.setVariable("exceptionName",exceptionName);
	context.setVariable("messageId",messageId);
	context.setVariable("errorText",errorText);
	context.setVariable("statusCode",statusCode);
	throw exceptionName;
}
}
else 
{
  	context.setVariable("exceptionName",exceptionName);
	context.setVariable("messageId",messageId);
	context.setVariable("errorText",errorText);
	context.setVariable("statusCode",statusCode);
	throw exceptionName;
 } 
