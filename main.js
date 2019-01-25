const https = require('https');
const url = "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States"
//const url = "/home/mitchell/Documents/Python/CapstoneProject/wiki.html"

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
  console.log("Error: " + err.message);
});

function cleanData(data) {
  //var newData = data.substring(0, data.indexOf("<footer"));
  var numbers = new RegExp('[0-9]');
  var newData = data.split("<td>");

  for (var i = 0; i < newData.length; i++) {
    //newData[i] = newData[i].substring(0, data.indexOf(RegExp))
    newData[i] = newData[i].exec(RegExp);

  }

  return cleanedData;
};
