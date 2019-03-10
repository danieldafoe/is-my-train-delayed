const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const testDataPath = path.join(__dirname, 'test-data/test-response.json');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen('5000', () => {
  console.log('Listening on port 5000...');
});

app.route('/api/ServiceUpdate/en/all').get((req, res) => {
  res.sendFile(testDataPath);
});