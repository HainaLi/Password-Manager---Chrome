# Password-Manager---Chrome
More secure password manager, Chrome version. 

This extension automatically scans a list of websites for its login button and form, checking whether the website contains a client side encryption system before it sends its user/password information to its server.

For a more complete view of what this password manager does, try the Firefox version, which is also uploaded as a repository. Chrome currently has a bug in its extension API in which you cannot change the HTTP request if it is encrypted. I am waiting for this bug to be solved before moving ahead with the Chrome version of my password manager. 

Installing a Chrome extension is relatively straightforward. Download the file "passwordmanager" and go to chrome://extensions/. Click on "Load unpacked extension..." and select the "passwordmanager" folder. 

Remember to disable all other password managers and extensions before running this one. 
