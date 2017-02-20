
var request    	= require('request')
var cheerio    	= require('cheerio')
var fs 	       	= require('fs')



request("http://www.allocine.fr/film/sorties-semaine/", function (error, response, html) {
	if (error) {
		fs.appendFile('log.txt', "Error: " + error)
		res.redirect('/')
	

	} else {

		var $ = cheerio.load(html ,  { decodeEntities: true });
		var titres = $('h2>a');
		var imax = titres.length;
		var imax = imax - 1;

	  	var film = []; 
	  	var item = {};

	  	for (var i = 0 ; i <= imax; i++) {
	  		item = {};	  
	  		var titre = $('h2>a')[i].children[0].data;
	  		var synopsis = $('.synopsis')[i].children[0].data;
	  		console.log(titre)

	  			
	  		synopsis = synopsis.replace(/\n/g, "")
	  		synopsis = synopsis.replace(/  /g, "")
	  		item ["titre"] = titre;
	  		item ["synopsis"] = synopsis;

	  		film.push(item);



	  	}

	  }


	  fs.writeFile('data.json', JSON.stringify(film), function(){

	  		console.log('fichier sauvé')
	  })

	  console.log(film)		

	})




