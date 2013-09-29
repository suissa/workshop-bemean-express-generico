
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var beer = require('./routes/beer');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.options("*", function (req, res) {
    // Finish preflight request.
    res.writeHead(204);
    res.end();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/expose/:dir/:name', routes.expose);

app.get('/', routes.index);
app.get('/users', user.list);


// Beers
app.get('/beers', beer.list);
app.post('/beers/', beer.create);
app.get('/beers/:id', beer.retrieve);
app.put('/beers/:id', beer.update);
app.delete('/beers/:id', beer.delete);

// app.get('/beers/create', beer.get_create);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });








