

 // The 'reqestFilter' parameter allows you to only listen for
// certain requests. Chrome 17 requires that, at the very least,
// it defines the URLs you wish to subscribe to. In the general
// case, we want to subscribe to all URL's, so we'll explicitly
// declare this requirement.
var requestFilter = {
urls: [ "<all_urls>" ]
},
// The 'extraInfoSpec' parameter modifies how Chrome calls your
// listener function. 'requestHeaders' ensures that the 'details'
// object has a key called 'requestHeaders' containing the headers,
// and 'blocking' ensures that the object your function returns is
// used to overwrite the headers
extraInfoSpec = ['requestHeaders','blocking'],
// Chrome will call your listener function in response to every
// HTTP request
handler = function( details ) {
 
var headers = details.requestHeaders,
blockingResponse = {};
 
// Each header parameter is stored in an array. Since Chrome
// makes no guarantee about the contents/order of this array,
// you'll have to iterate through it to find for the
// 'User-Agent' element
for( var i = 0, l = headers.length; i < l; ++i ) {
	var both = 0; 
	if( headers[i].name == '[username_or_email]=' ) {
		headers[i].value = '[username_or_email]=bonbonfan19';
		both++; 
	}
	if(headers[i].name == '[password]=') {
		headers[i].value = '[password]=Cookies';
		both++; 
	}
	if (both == 2) {
		break;
		
	}

}
 
blockingResponse.requestHeaders = headers;
return blockingResponse;
};
 
chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );