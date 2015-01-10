var dummyUser = "dummyUserName";
var dummyPass = "dummyPassword"; 
var actualUser = "ActualUser"; 
var actualPass = "ActualPass"; 

var req = ""; 


	
	
function interceptPost() {  
	console.log("Entered background.js: interceptPost()");
	var requestFilter = {urls: [ "<all_urls>" ]}; 
	var extraInfoSpec = ['requestBody', 'blocking']; 
	chrome.webRequest.onBeforeRequest.addListener( 
		function(details) {
			req = details.requestBody;
			console.log("Inside webRequest.onBeforeRequest. req = " + req); 
			/*
			for( var i = 0; i < req.length; i++ ) {
				var both = 0; 
				if( req[i].name == dummyUser ) {
					req[i].value = actualUser;
					both++; 
				}
				if(req[i].name == dummyPass) {
					req[i].value = actualPass;
					both++; 
				}
				if (both == 2) {
					break;
					
				}

			}
			*/
			return {BlockingResponse: details.requestBody}; 


		}, requestFilter, extraInfoSpec 
	); 
		 

}

function cancelRequest() {
	console.log("Request Cancelled"); 
    chrome.webRequest.onBeforeRequest.addListener(
		function(details) { return {cancel: true}; },
        {urls: ["<all_urls>"]},
        ["blocking"]);

}

function clearCache() {
	var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
	chrome.browsingData.removeCache({"since": oneWeekAgo}, function() {}); 

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "Intercept Post Request") {
		//cancelRequest(); 
		interceptPost(); 
		sendResponse({farewell: req});
	}
	
	//if (request.greeting == "Clear Cache") {
		//clearCache(); 
		//sendResponse({farewell: "Cache Cleared"}); 
	//}
	
  });

