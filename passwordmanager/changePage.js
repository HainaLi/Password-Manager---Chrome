//var oldpage = /sciencedirect.com\//;
var newpage = "https://www.google.com";
function setUp() {
  chrome.browserAction.setIcon({path:"icon3.png"});

}
function updateUrl(tab){
  //if(tab.url.match(sciencedirectold))
  //{
      chrome.tabs.update(tab.id, {url: newpage});
  //}
}

chrome.browserAction.onClicked.addListener(function(tab) {updateUrl(tab);});

setUp(); 