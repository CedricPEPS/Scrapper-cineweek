var express  	= require('express')

var fs = require('fs');



var app = express()

app.get('/', function(req, res){
	


fs.readFile('data.json', (err, data) => {
  if (err) throw err;
  json = JSON.parse(data);

res.json(json);
});




})

// 404
app.use (function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
})

//listen server
app.listen(8080, function() {
    console.log('running on port 8080')
})
