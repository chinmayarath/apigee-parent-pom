resp = JSON.parse(context.getVariable("message.content"));

majorCode = resp[Object.keys(resp)[0]].return.returnCode.majorReturnCode;
minorCode = resp[Object.keys(resp)[0]].return.returnCode.minorReturnCode;

context.setVariable("majorCode",majorCode);
context.setVariable("minorCode",minorCode);