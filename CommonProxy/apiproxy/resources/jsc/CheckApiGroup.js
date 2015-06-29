envName = context.getVariable("environment.name");
if( envName.indexOf("sandbox") >= 0) {
	context.setVariable("apiGroup","SANDBOX");
} else {
	context.setVariable("apiGroup","PRODUCTION");
}
