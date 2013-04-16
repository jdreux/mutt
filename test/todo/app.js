// Setup the proxy. 

// This is better done in a node process separate from mutt & the api to allow for better multiprocessing.

var config = {
	'apiHost': 'localhost',
	'apiPort': 4688,
	'muttHost': 'localhost',
	'muttPort': 8864
};

var proxy = require('../../').proxy(config);

proxy.listen(8080);

console.log("Todo app is listening on localhost:8080");

//MUTT APP

var express = require('express'),
	exphbs  = require('express3-handlebars'),
	app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(require('../../').middleware(config));

app.use("/views/",express.static(__dirname+'/views'));

// app.get("*", function(req, res, next){
// 	console.log("Handled by Mutt!");
// 	next();
// });

app.get('/', function (req, res, next) {
	console.log('Get /');
	console.log(req.api.get);
	req.api.get('/todos').on('success', function(todos){
		console.log("got todos");
		console.log(todos);
		res.render('home', {'todos':todos});
	}).on('error', function(err){
		console.log("Error!");
		console.log(err);
		res.end("An error has occured")
	});
});

app.listen(8864);

console.log("Mutt is listening on port 8864");


//API SERVICE

var todos = {
	"1": {
		"id": "1",
		"text": "Run the test app",
		"done": true
	},
	
	"2": {
		"id": "2",
		"text": "Star the Github project",
		"done": false
	}
};

api = express();

api.get("*", function(req, res, next){
	console.log("Request handled by API!");
	next();
})

api.get('/todos', function(req, res, next){
	res.end(JSON.stringify(todos));
});

api.put('/todos', function(req, res, next){
	var id = Math.random().toString(16);
	
	todos[id] = {
		"id": id,
		"text": req.body.text,
		"done": false
	};
	
	res.end();
});

api.delete('/todos/:id', function(req, res, next){
	var id = req.params.id;
	
	delete todos[id];
	
	res.end();
});

api.post('/todos/:id/toggle', function(req, res, next){
	var id = req.params.id;
	
	todos[id].done = !todos[id].done;
	
	res.end();
});

api.listen(4688);

console.log("API is listening on port 4688");