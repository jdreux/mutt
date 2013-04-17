var httpProxy = require('http-proxy');

module.exports = function(options){
	
	if(!options.apiPort){
		throw "Missing apiPort configuration for hybrid proxy";
	} else if(!options.apiHost){
		throw "Missing apiPort configuration for hybrid proxy";
	} else if(!options.muttHost){
		throw "Missing muttHost configuration for hybrid proxy";
	} else if(!options.muttPort){
		throw "Missing muttPort configuration for hybrid proxy";
	}
	
	var apiRule = function(req){
		return req.url.indexOf('/api/') === 0;
	}
	
	return httpProxy.createServer(function(req, res, proxy){
		
		if(apiRule(req)){
			proxy.proxyRequest(req, res, {
				host: options.apiHost,
				port: options.apiPort
			});
		} else {
			proxy.proxyRequest(req, res, {
				host: options.muttHost,
				port: options.muttPort
			});
		}
	});
}