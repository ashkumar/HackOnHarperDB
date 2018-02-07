package com.pangong.harper.resources;

public class Constants {
	public static final String AllDogsQuery = "{\"operation\": \"sql\",\"sql\":\"SELECT id, dog_name, owner_name, age FROM dev.dog\"}";
	public static final String USERNAME = "externalDBUserName";
	public static final String PASSWORD = "externalDBPassword";
	public static final String JSON = "application/json";
	public static final String SERVERURL = "http://localhost:9925"; 
	public static final String insertQuery = "{" + 
			"    \"operation\":\"insert\"," + 
			"    \"schema\" :  \"patient\"," + 
			"    \"table\":\"patientattributes\"," + 
			"    \"records\": [" + "%FORM%" + 
			"    ]" + 
			"}";
	public static final String updateQuery = "{" + 
			"    \"operation\":\"update\"," + 
			"    \"schema\" :  \"patient\"," + 
			"    \"table\":\"patientattributes\"," + 
			"    \"records\": [" + "%FORM%" + 
			"    ]" + 
			"}";
	
	public static final String getUser ="{" + 
			"  \"operation\": \"sql\"," + 
			"  \"sql\":\"SELECT * FROM patient.patientattributes where userid = %USERID%\"" + 
			"}";
}
