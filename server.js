const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// app.set('views', './views')
// app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/dist/is-my-train-delayed')));

// Allow requests from any domain - to solve a CORS bug.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//
// API: /
// --------------------------------------------------------------------------
app.get('/', function(req, res) {
  res.set('Content-Type', 'text/html');
  res.render('index.html');
});

//
// Handle Errors
// --------------------------------------------------------------------------
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});
app.use((req, res, next) => {
	res.status(404);
	res.render('404');
});

app.listen(process.env.PORT || 5000);

exports = module.exports = app;