var rest = require('restler');


module.exports = function(options){
	
	if(!options.clientService && !options.apiHost && !options.apiPort){
		throw "Hybrid middleware requires either options.clientService OR options.apiHost and options.apiPort";	
	}
	
	var ApiService = options.clientService || rest.service(function(){}, {
		baseURL: options.apiHost+":"+options.apiPort
	});
	
	console.log("Connecting to: "+options.apiHost+":"+options.apiPort);

	return function(req, res, next){
		
		req.api = new ApiService();
		
		req.api.defaults = req.api.defaults || {}; 
		
		req.api.defaults.headers = {};
		
		req.api.defaults.headers['Cookies'] = (req.api.defaults.headers? req.api.defaults.headers['Cookies'] + req.headers['Cookies'] : req.headers['Cookies']);				
		
		var r = req.api.request;

		req.api.request = function(){
			//Add the request's cookies to the api request
			console.log("Request!!");
			if(arguments.length>=1 && typeof arguments[arguments.length-1] === "object"){
				
				var options = arguments[arguments.length-1] || {}; 
				
				options.headers = options.headers || {};
				
				options.headers['Cookies'] = (options.headers['Cookies'] || "") + req.headers['Cookies'];				
				
				arguments[arguments.length-1] = options;
			}
			console.log(arguments[0]);
			var re = r.apply(this, arguments);
			console.log(re.url); 
			return re;
		};
		
		next();		
	};
};