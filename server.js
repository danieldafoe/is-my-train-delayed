var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res) {

	// Scrape GO Transit main page
  url = 'http://www.gotransit.com/publicroot/en/default.aspx';

  request(url, function(error, response, html) {
      if (!error) {
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
          var $ = cheerio.load(html);
          var trainCount = $('.gridStatusTrain tbody').find('tr').length;
          var trains = $('.gridStatusTrain tbody tr');
          var timestamp = $('.timestamp div span').html();
          var trainsDelayed = trains.has('.delayLink');
          console.log(timestamp);
          console.log(trains['0']);
          console.log(trainsDelayed);
          for (var i = 0; i < trainCount; i++) {
          	var train = trains[i.toString()];
          }
      }
  });

  res.render('index.html', {});
});

app.trainsAreDelayed = function() {
	url = 'http://www.gotransit.com/publicroot/en/default.aspx';

  request(url, function(error, response, html) {
      if (!error) {
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
          var $ = cheerio.load(html);
          var trains = $('.gridStatusTrain tbody tr');
          var trainsDelayed = trains.has('.delayLink');

          // If trainsDelayed.length is 0, none are delayed
          if (trainsDelayed.length === 0) {
          	return false;
          }
          else {
          	return true;
          }
      }
  });
}

app.listen(process.env.PORT || 5000);
console.log('Magic happens on port 8081');

exports = module.exports = app;