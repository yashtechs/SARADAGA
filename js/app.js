// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "account":"../accounts",
      "movement":"../movements",
      "login":"../login",
      "sepa":"../sepa",
      "stubs":"../stubs",
	  "iScroll":"iscroll",
	  "mask":"../mask"
     
    },
    "shim": {
    	
        "jquery.alpha": ["jquery"],
        "jquery.beta": ["jquery"],
        "selectize":["jquery"],
		"transition":["jquery"],
		"collapse":["jquery"],
        "underscore": {
        	exports:"_"
        },
        "pagebus":{
        	exports:"PageBus"
        },
        "backbone": {
        	deps:["jquery","underscore"],
        	exports:"Backbone"
        },
        "deep-model":{
            deps:["backbone","underscore"]
        },
        "rivets":{
            deps:["jquery"],
        	exports:"rivets"
        },
        "iScroll": {
            exports:"iScroll"
        },
        "sinon": {
            exports:"sinon"
        }
    },
    /*"packages" :{[
        "accounts": {
            location:"account"
        },

        ]
    },*/

    config:{
    	"account/model/account": {
    		accountUrl:"someUrl"
    	}
    },
    waitSeconds:0
});

// Load the main app module to start the app
requirejs(["../main"]);
