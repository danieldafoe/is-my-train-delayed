var express = require('express');
var path = require('path');
var fs = require('fs');
var pug = require('pug');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/')));
app.get('/', function(req, res) {

	// Scrape GO Transit main page
  var url = 'http://www.gotransit.com/publicroot/en/default.aspx';
  var timestamp;
  var trainsArr = [];

  // Supply formatted, scraped data to render of pug
  request(url, function(error, response, html) {
		if (!error) {
	    var $ = cheerio.load(html);
	    timestamp = $('.timestamp div span').html();
	    // Returns all train lines
	    var trains = $('#rtab1 .gridStatusTrain tbody tr');
	    // If empty, no trains are delayed
	    var trainsDelayed = trains.has('.delayLink');

	    for (var i = 0; i < trains.length; i++) {
	    	var name = $(trains[i.toString()]).find('.gridStatusWidthOne').text();
	    	console.log($(trains[i.toString()]).has('.delayLink'));
	    	var isDelayed = $(trains[i.toString()]).has('.delayLink').length === 0 ? "No" : "Yes";

	    	// Push retrieved train line info
	    	// to trains array
	    	trainsArr.push({
	    		"name": name,
	    		"isDelayed": isDelayed
	    	})
	    }
    }

    res.render('index', { "retrieveTime": timestamp, "trains": trainsArr });
	});
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

app.getTrains = function() {
	request(url, function(error, response, html) {
		if (!error) {
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(html);
        var trains = $('.gridStatusTrain tbody tr');
        var trainsDelayed = trains.has('.delayLink');
        var trainsArr = [
        	{
        		"name": "Test",
        		"isDelayed": false
        	}
        ];

        // If trainsDelayed.length is 0, none are delayed
        if (trainsDelayed.length === 0) {
        	return false;
        }
        else {
        	return true;
        }
    }
	});

  res.render('index', { "trains": trainsArr });
}

app.listen(process.env.PORT || 5000);

exports = module.exports = app;