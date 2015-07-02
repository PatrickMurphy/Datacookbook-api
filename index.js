var isObject = require('is-object'),
	absorb = require('absorb'),
	http = require('http');



// DataCookBookAdapter
module.exports = {
	requestTypes: {
		term_lookup: 'term_lookup',
		list: 'list',
		term_search: 'term_search'
	},
	APIConfig: {
		initialized: false,
		useToken: false,
		token: '',
		user: {
			un: 'default',
			pw: 'password'
		},
		requestURL: {
			protocol: 'https://',
			subdomain: 'centralwashingtonu',
			baseURL: 'datacookbook.com',
			resourcePath: '/institution/terms/',
			resource: 'lookup',
			outputFormat: 'json'
		}
	},

	// todo a login function to manage user settings
	// todo a url settings function

	init: function (options) {
		options = options || {};

		options.initialized = false;
		absorb(this.APIConfig, options);

		this.APIConfig.initialized = true;
	},

	connect: function () {
		if (arguments.length == 2) {
			if (isObject(arguments[0]) && arguments[0].hasOwnProperty('un') && arguments[0].hasOwnProperty['pw']) {
				var options = {
					user: arguments[0],
					requestUrl: {
						subdomian: arguments[1]
					}
				};
				this.init(options);
				return {
					status: true,
					message: 'success'
				};
			} else {
				return {
					status: false,
					message: 'Expected first parameter to be a valid user object'
				};
			}
		} else if (arguments.length == 3) {
			var options = {
				user: {
					un: arguments[0],
					pw: arguments[1]
				},
				requestUrl: {
					subdomian: arguments[2]
				}
			};
			this.init(options);
			return {
				status: true,
				message: 'success'
			};
		} else {
			return {
				status: false,
				message: 'Incorrect parameter count, expected 2 (userObj, subdomain) or 3 (username, pwd, subdomain)'
			};
		}
	},

	encode_params: function (params) {
		var index,
			queryString = '?';

		if (!isObject(params)) {
			throw 'params must be an object';
		}

		if (this.APIConfig.useToken) {
			throw 'Tokens not currently supported';
		} else {
			// Add the user & password to the object
			absorb(params, this.APIConfig.user);
		}

		params.outputFormat = this.APIConfig.requestURL.outputFormat;


		for (index in params) {
			// foreach property in params add &{property}={value}
			queryString += '&' + index + '=' + encodeURIComponent(params[index]);
		}

		return queryString;
	},

	getRequest: function (params, resource, callback) {
		resource = resource || this.APIConfig.requestURL.resource;
		callback = callback || function () {};

		if (!this.APIConfig.initialized) {
			throw 'The DataCookBookAPI has not been correctly initialized yet';
		}

		var cfg = this.APIConfig.requestURL,
			options;

		// build url
		options = {
			host: cfg.protocol + cfg.subdomain + '.' + cfg.baseURL,
			path: cfg.resourcePath + resource + this.encode_params(params),
			method: 'GET'
		};

		// make call
		http.request(options, callback);
	},

	// Shortcut methods:
	termList: function (filters, callback) {
		filters = filters || {};
		callback = callback || function () {};

		// build params
		var params = {
			requestType: this.requestTypes.list
		};

		// add any filters
		absorb(params, filters);

		// pass to get
		this.getRequest(params, 'list', callback);
	},

	termLookup: function (query, options, callback) {
		options = options || {};
		callback = callback || function () {};

		// build params
		var params = {
			requestType: this.requestTypes.term_lookup,
			lookup: query
		};

		// add any filters
		absorb(params, options);

		// pass to get
		this.getRequest(params, 'list', callback);
	},

	termSearch: function (query, callback) {
		callback = callback || function () {};

		// build params
		var params = {
			requestType: this.requestTypes.term_search,
			search: query
		};

		// pass to get
		this.getRequest(params, 'list', callback);
	}
};
