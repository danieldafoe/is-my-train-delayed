const express = require('express');
const path = require('path');
const fs = require('fs');
const pug = require('pug');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/')));

//
// API: /
// --------------------------------------------------------------------------
app.get('/', function(req, res) {

	// Scrape GO Transit main page
  const url = 'http://www.gotransit.com/publicroot/en/default.aspx';
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
	    	// Set default status to On time
	    	var status = "On time";
	    	// Check if <tr> contains info within one of its children
	    	var smallDelay = $(trains[i.toString()]).has('.delayLink');
	    	// Check if <tr> has link to URL with additional info
	    	var bigDelay = $(trains[i.toString()]).has('.moreInfoLink');
		    			// Data within the <span>. Contains up to 7 children. (As of 12/01/2016)
		    			// Counts text as an Object?
		    			// [0] = Which train time is delayed (e.x., Union Station 22:13 - Aldershot GO 23:31)
		    			// [1] = <br>
		    			// [2] = Length of delay (e.x., Delay of 7m:53s)
		    			// [3] = <br>
		    			// [4] = State of train (e.x., Moving)
		    			// [5] = <br>
		    			// [6] = Additional state of train (e.x., Waiting on a train ahead)
//
// API: /fetch
// --------------------------------------------------------------------------
app.get('/fetch', (req, res) => {
	var url = 'http://www.gotransit.com/publicroot/en/default.aspx';
	var trainsArr = [];
	var timestamp;

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
	    	var status = $(trains[i.toString()]).has('.delayLink').length === 0 ? "On time" : "Delayed";

	    	// Push retrieved train line info
	    	// to trains array
	    	trainsArr.push({
	    		"name": name,
	    		"status": status
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

app.listen(process.env.PORT || 5000);

exports = module.exports = app;