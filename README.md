DataCookBook-api
================

A thin api wrapper providing methods to get data from the different datacookbok apis

## Installation

  npm install datacookbook-api

## Usage

Require the installed package

  var DataCookbook = require('datacookbook-api');
	
Choose `datacookbook.init(settings_obj)` or `datacookbook.connect(username, password, subdomain);`
	
	DataCookbook.init({user:{un: 'myUsername', pw: 'myPassword'}, requestUrl: {subdomian: 'mySubdomain'}});
	
Or you can use the connect method, note `datacookbook.connect(user_obj, subdomain)` is also available

	DataCookbook.connect('user', 'password', 'subdomain');
  
All the API Methods use callbacks
	var defaultCallback = function (response) {
		console.log(response);
	},
	defaultParameters = {};

	DataCookbook.termList(defaultParameters, defaultCallback);
	
	DataCookbook.tearmSearch('searchQuery', defaultCallback);
	
	DataCookbook.tearmLookup('query', defaultParameters, defaultCallback);
	
## Settings

	The the parameters available to init and default values are as follows:
	{
		useToken: false, // set to true and provide token if you plan to use token access
		token: '',
		user: {
			un: 'default',
			pw: 'password'
		},
		requestURL: {
			protocol: 'https://',
			subdomain: 'collegename', // Set this as your institutions subdomain
			baseURL: 'datacookbook.com',
			resourcePath: '/institution/terms/',
			resource: 'lookup',
			outputFormat: 'json'
		}
	}

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Planned Features
	
	Authentication Token Login API integration

## Release History
* 1.2.0 Add connect method for easier instantiation 
* 1.1.0 Change dependency to self developed merge package `npm absorb` & added documentation folder
* 1.0.0 Initial release