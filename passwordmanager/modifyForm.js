

debugger;  
var user = 0; 
var password = 0; 
var formChanged = 0; 
var actionChanged = 0; 
var dummyInserted = 0; 
var trafficIntercepted = 0; 
var submitbuttondetected = 0;
var dummyUser = "dummyUserName";
var dummyPass = "dummyPassword"; 
var actualUser = "ActualUser"; 
var actualPass = "ActualPass"; 


var usernameid = ''; 
var passwordid = '';
var loginFormid = ''; 
var submitbuttonid = '';

var site = "Google"; 




function setIds(website) {
	if (website == "Google") {
		usernameid = 'Email'; 
		passwordid = 'Passwd'; 
		loginFormid = 'gaia_loginform'; 
		submitbuttonid = 'signIn';
	}
	else if (website == "Twitter") {
		usernameid = 'Email'; 
		passwordid = 'Passwd'; 
		loginFormid = 'gaia_loginform'; 
		submitbuttonid = 'signIn';	
	}
	else {
		usernameid = 'Email'; 
		passwordid = 'Passwd'; 
		loginFormid = 'gaia_loginform'; 
		submitbuttonid = 'signIn';	
	
	}

}

function clearCache() {

	chrome.runtime.sendMessage({greeting: "Clear Cache"}, function(response) {
	  console.log(response.farewell);
	});
}
function checkUserPasswdField() { //returns true if the password and username fields are found
	//var forms = document.getElementsByTagName("Form"); 


	if (document.querySelector("#" + usernameid) != null ) {
		user = 1; 
		console.log("username field found"); 
	}
	else {
		console.log("username field not found"); 
	}
	
	if (document.querySelector("#" + passwordid) != null ) {
		password = 1; 
		console.log("password field found"); 
	}
	else {
		console.log("password field not found"); 
	}
	
	if (user == 1 & password == 1) {
		return true; 
	}
	else {
		return false; 
	}
	
} 

function changeAction() { //of the sign in submit button
	if (user == 1 & password == 1) {
		actionChanged = 1;
		jQuery("#" + loginFormid).attr('action', 'https://localhost'); 	
	}
	else {
		return false; 
	}

}


 
 
function blockSignInForm() {
	if (user == 1 & password == 1) {
		jQuery("#" + usernameid).hide(); 
		jQuery("#" + loginFormid).prepend("<h2>Your Username and Password Have Been Saved By Password Manager</h2>"); 
		jQuery("#" + passwordid).hide(); 
		jQuery("#" + loginFormid).prepend("<h2>Please Press Login to Continue</h2>"); 
		formChanged = 1; 
		return true; 
	}
	else {
		return false; 
	}

}

function insertDummy() {
	if (formChanged == 1) {
		jQuery("#" + usernameid).val(dummyUser); 
		jQuery("#" + passwordid).val(dummyPass); 
		dummyInserted = 1; 
		user = 0;
		password = 0; 
		
		document.querySelector("#" + submitbuttonid).addEventListener('click', function() {
			submitbuttondetected = 1; 
			interceptPost(); 
			alert("submit button click detected!"); 
		}, false); 
		return true; 
	}
	
	else {
		return false; 
	}

}

//function clickSubmit() {


//}

function interceptPost() {
	console.log("Entered modifyForm.js : interceptPost()"); 
	if (dummyInserted == 1 & submitbuttondetected == 1) {
		console.log("Intercepting Post"); 
		chrome.runtime.sendMessage({greeting: "Intercept Post Request"}, function(response) {
			console.log(response.farewell);
		});	
		
		trafficIntercepted = 1; 
		return true; 
	}
	else {
		return false; 
	}
}
 


 
 //execute methods
setIds(site); 
//clearCache(); 
checkUserPasswdField(); 
//changeAction(); //only during debugging
blockSignInForm(); 
insertDummy();



 

//clickSubmit(); 

//sendMessage(); 