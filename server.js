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
			var name, status, smallDelay, bigDelay;
			var names = [];
			var $ = cheerio.load(html);
			timestamp = $('.timestamp div span').html();
			// Returns all train lines
			var trains = $('#rtab1 .gridStatusTrain tbody tr');
			// If empty, no trains are delayed
			var trainsDelayed = trains.has('.delayLink');

			for (var i = 0; i < trains.length; i++) {
				name = $(trains[i.toString()]).find('.gridStatusWidthOne').text();
				
				// Set default status to On time
				status = "On time";
				// Check if <tr> contains info within one of its children
				smallDelay = $(trains[i.toString()]).has('.delayLink');
				// Check if <tr> has link to URL with additional info
				bigDelay = $(trains[i.toString()]).has('.moreInfoLink');

				// If <tr> contains an element
				// with either .delayLink or
				// .moreInfoLink, it's delayed
				if (smallDelay.length > 0) {
					status = "Delayed";

					// If the current retrieved train line is delayed,
					// find info about it
					var statusText, direction, details;
					var statusArr = [];
					// Find all directions there are delays for
					var delayDirections = $(trains[i.toString()]).find('.messageDisrp .subtitle');

					for (var j = 0; j < delayDirections.length; j++) {
						direction = $(delayDirections[j.toString()]).find('h4').text();
						// Get all next sibling <li> elements that are not
						// another node with a directional title
						delay = $(delayDirections[j.toString()]).nextUntil('.subtitle');

						// Iterate through <span> within each delay
						// and get delay information
						$(delay).find('span').each(function(i, el) {
							// Data within the <span>. Contains up to 7 children. (As of 12/01/2016)
							// Counts text as an Object?
							// [0] = Which train time is delayed (e.x., Union Station 22:13 - Aldershot GO 23:31)
							// [1] = <br>
							// [2] = Length of delay (e.x., Delay of 7m:53s)
							// [3] = <br>
							// [4] = State of train (e.x., Moving)
							// [5] = <br>
							// [6] = Additional state of train (e.x., Waiting on a train ahead)
							statusArr.push({
								"delayDirection": direction,
								"delayedTrain": el.children[0].data,
								"delayLength": el.children[2].data,
								"delayStatus": el.children[4].data
							});
						});
					}
				}
				else if (bigDelay.length > 0) {
					names.push(name);
					status = "Delayed";

					// If the current retrieved train line is delayed,
					// find info about it
					var statusText, details;
					var statusArr = [];
					var moreInfoURL = $(trains[i.toString()]).find('.moreInfoLink').attr('href');

					// If there's more information, display the link to find it
					statusArr.push({
						"delayMsg": moreInfoURL
					});

					// request(moreInfoURL, function(error, response, html) {
					// 	if (!error) {
					  //   var $ = cheerio.load(html);
					  //   var content = $('#divupdates_train .MsgGroup');
					  //   var msgTitles = $(content).find('h2');

					  //   for (var l = 0; l < names.length; l++) {
					  //   	// If name of train with "more information" matches
					  //   	// name of retrieved <h2>, we're on the right info page
					  //   	if (names[l] === $(msgTitles[l.toString()]).text()) {
						 //    	statusArr.push({
							//     	"delayMsg": $(content).find('li').text()
							//     });
						 //    }
						 //    else {
						 //    	statusArr.push({
							//     	"delayMsg": ""
							//     });
						 //    }
					  //   }
					  // }
					// });
				}

				// Push retrieved train line info
				// to trains array
				trainsArr.push({
					"name": name,
					"status": status,
					"details": statusArr
				});
			}
		}
		res.render('index', { "retrieveTime": timestamp, "trains": trainsArr });
	});
});

//
// API: /fetch
// --------------------------------------------------------------------------
app.get('/fetch', (req, res) => {
	// Scrape GO Transit main page
  const url = 'http://www.gotransit.com/publicroot/en/default.aspx';
  var timestamp;
  var trainsArr = [];

	// Supply formatted, scraped data to render of pug
	request(url, function(error, response, html) {
		if (!error) {
			var name, status, smallDelay, bigDelay;
			var names = [];
			var $ = cheerio.load(html);
			timestamp = $('.timestamp div span').html();
			// Returns all train lines
			var trains = $('#rtab1 .gridStatusTrain tbody tr');
			// If empty, no trains are delayed
			var trainsDelayed = trains.has('.delayLink');

			for (var i = 0; i < trains.length; i++) {
				name = $(trains[i.toString()]).find('.gridStatusWidthOne').text();
				
				// Set default status to On time
				status = "On time";
				// Check if <tr> contains info within one of its children
				smallDelay = $(trains[i.toString()]).has('.delayLink');
				// Check if <tr> has link to URL with additional info
				bigDelay = $(trains[i.toString()]).has('.moreInfoLink');

				// If <tr> contains an element
				// with either .delayLink or
				// .moreInfoLink, it's delayed
				if (smallDelay.length > 0) {
					status = "Delayed";

					// If the current retrieved train line is delayed,
					// find info about it
					var statusText, direction, details;
					var statusArr = [];
					// Find all directions there are delays for
					var delayDirections = $(trains[i.toString()]).find('.messageDisrp .subtitle');

					for (var j = 0; j < delayDirections.length; j++) {
						direction = $(delayDirections[j.toString()]).find('h4').text();
						// Get all next sibling <li> elements that are not
						// another node with a directional title
						delay = $(delayDirections[j.toString()]).nextUntil('.subtitle');

						// Iterate through <span> within each delay
						// and get delay information
						$(delay).find('span').each(function(i, el) {
							statusArr.push({
								"delayDirection": direction,
								"delayedTrain": el.children[0].data,
								"delayLength": el.children[2].data,
								"delayStatus": el.children[4].data
							});
						});
					}
				}
				else if (bigDelay.length > 0) {
					names.push(name);
					status = "Delayed";

					// If the current retrieved train line is delayed,
					// find info about it
					var statusText, details;
					var statusArr = [];
					var moreInfoURL = $(trains[i.toString()]).find('.moreInfoLink').attr('href');

					// If there's more information, display the link to find it
					statusArr.push({
						"delayMsg": moreInfoURL
					});
				}

				// Push retrieved train line info
				// to trains array
				trainsArr.push({
					"name": name,
					"status": status,
					"details": statusArr
				});
			}
		}
		res.send({ "retrieveTime": timestamp, "trains": trainsArr });
	});
});


app.listen(process.env.PORT || 5000);

exports = module.exports = app;