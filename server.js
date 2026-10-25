'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');

const companies = require('./data/companies');
const site = require('./data/site');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(helmet());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  res.render('index', { site, companies });
});

// Other pages (privacy policy, sub-company pages) will be added later.

app.listen(PORT, () => {
  console.log(`VEXAURIQ site running at http://localhost:${PORT}`);
});