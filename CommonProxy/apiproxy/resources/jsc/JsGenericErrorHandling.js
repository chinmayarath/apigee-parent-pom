var response_code =context.getVariable("response.status.code");
var response_phrase =context.getVariable("response.reason.phrase");

var resp_generic = {  
   "id":"SVC0001",
   "description":"Service Error -"+response_phrase
};

context.setVariable("code",response_code);
context.setVariable("phrase",response_phrase);
context.setVariable("message.content",JSON.stringify(resp_generic, null, 2));
 

