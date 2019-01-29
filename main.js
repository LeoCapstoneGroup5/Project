const https = require('https');
const DEBUG_MODE = true;

if (DEBUG_MODE){
  localDebug();
} else {
  getWebpage();
}

function localDebug() {
  //if debug mode is enabled this function will run and retrieve a local file
  var fs = require('fs');

  try {
      var data = fs.readFileSync('wiki.html', 'utf8');
      data = cleanData(data);
  } catch(e) {
      console.log('Error:', e.stack);
  }
}

function getWebpage() {
  //if debug mode is off this will retrieve whatever is in the url constant
  const url = "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States"

  https.get(url, (scrape) => {
    var data = '';

    scrape.on('data', (piece) => {
      data += piece;
    });

    scrape.on('end', () => {
      data = cleanData(data);
      console.log(data);
    });

  }).on("error", (e) => {
    console.log("Error: " + e.message);
  });
}

function cleanData(data) {
  //var newData = data.substring(0, data.indexOf("<footer"));
  const tdCheck = new RegExp('\<tr');
  const numbers = new RegExp(/\d/g);
  var newData = data.split(tdCheck);
  var cleanedData = '';

  for (var i = 0; i < newData.length; i++) {
    //newData[i] = newData[i].substring(0, data.indexOf(RegExp))
    //clanedData = newData[i] = newData[i].exec(RegExp) + '\n';
    if (numbers.test(newData[i])) {
      var output = newData[i].match(numbers);
      console.log('found: ' + output);
    }
  }

  return cleanedData;
}

function localDebug() {
	//if debug mode is enabled this function will run and retrieve a local file
	var fs = require('fs');

	try {
	   var data = fs.readFileSync('wiki.html', 'utf8');
     data = cleanData(data);
	} catch(e) {
	   console.error('Error:', e.stack);
	}
}

function getWebpage() {
	//if debug mode is off this will retrieve whatever is in the url constant
	const url = "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States"

	https.get(url, (scrape) => {
	  var data = '';

	  scrape.on('data', (piece) => {
	    data += piece;
	  });

	  scrape.on('end', () => {
	    data = cleanData(data);
	    console.log(data);
	  });
	}).on("error", (err) => {
	  console.error("Error: " + err.message);
	});
}

function cleanData(data) {
	//var newData = data.substring(0, data.indexOf("<footer"));
	const tdCheck = new RegExp('\<tr');
	const numbers = new RegExp(/\d/g);
	var newData = data.split(tdCheck);
	var cleanedData = '';

	for (var i = 0; i < newData.length; i++) {
		//newData[i] = newData[i].substring(0, data.indexOf(RegExp))
		//clanedData = newData[i] = newData[i].exec(RegExp) + '\n';
		if (numbers.test(newData[i])) {
      var output = newData[i].match(numbers);
			console.log('found: ' + output);
		}
  }
  return cleanedData;
}
