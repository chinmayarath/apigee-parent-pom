var configValues= context.getVariable("configValues");
try{
	configValuesJson = JSON.parse(configValues);
	var isLoggingEnabled = configValuesJson.isLogginEnabled;
	context.setVariable("isLogginEnabled", isLoggingEnabled);
}
catch(e){
}
