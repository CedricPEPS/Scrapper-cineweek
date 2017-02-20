var express  	= require('express')
var request    	= require('request')
var cheerio    	= require('cheerio')
var fs 	       	= require('fs')

var app = express()




app.get('/', function(req, res){
	request("http://www.allocine.fr/film/sorties-semaine/",function (error, response, html) {
		if (error) {
			fs.appendFile('log', "Error: " + error)
			res.redirect('/')
		} else {

			var $ = cheerio.load(html)

			var title 		= $('h2').text().replace(/(?:\r\n|\r|\n)/g, ';');
			var newtitle1 	= title.replace(/  /g, '')
			var newtitle 	= newtitle1.replace(/;;/g, ';')
			var tab		 	= newtitle.split("\n")

			var synopsis = $('.synopsis').text().replace(/(?:\r\n|\r|\n)/g, ';');
			var synopsis = synopsis.replace(/  /g, '')
			var synopsis = synopsis.replace(/;;/g, ';')
			var tabsyn	 = synopsis.split("\n")





			var resultat = newtitle.replace(/(^\s*;)|(;\s*$)/g, '').split(";");
			var res1 = synopsis.replace(/(^\s*;)|(;\s*$)/g, '').split(";");

			fs.writeFile('data', '');
			fs.writeFile('data.json', '');

		// function Films(titre, synopsis) {
	 //      this.titre=titre;
	 //      this.synopsis=synopsis;

	}

	var imax = resultat.length;
	var imax = imax-1;
		// console.log(imax);
		fs.appendFile('data.json', "[{"+"\n"+"\t" );

		for (i=0; i<=imax ; i++)
		{

			var film = new Array;
			film = {'titre': resultat[i], 'synopsis': res1[i]};
		// film[resultat[i]] = res1[i];
		fs.appendFile('data', resultat[i]+"\n"+res1[i]+"\n"+"\n" );		
		fs.appendFile('data.json', "\n\t\"titre\" :"+"\""+resultat[i]+"\""+","+"\n\t\"synopsis\" :"+"\""+res1[i]+"\""+",\n" );
		




		// var tmp=new Array;

		// var tmp[i]=new Films(resultat[i],res1[i]);

		// fs.appendFile('test', tmp);

	}
	fs.appendFile('data.json', "\t}] " );
	fs.appendFile('data', film[i]);

		// response.json(film);
		// console.log(tmp)
		
		// console.log(resultat);
		// console.log(res1);
		// fs.appendFile('data', film );

	})

	var obj = fs.readFileSync('data.json', 'utf8');

	console.log(obj);

	res.send(JSON.parse(obj));
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