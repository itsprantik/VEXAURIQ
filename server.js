'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');

const companies = require('./data/companies');
const site = require('./data/site');
const about = require('./data/about');
const policy = require('./data/privacy');
const terms = require('./data/terms');

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
// ---- About page ----
app.get('/about', (req, res) => {
  res.render('about', { site, companies, about });
});
// ---- Privacy policy ----
app.get('/privacy', (req, res) => {
  // fills {name} and {email} placeholders in data/privacy.js
  const fill = (t) =>
    t.replace(/\{name\}/g, site.name).replace(/\{email\}/g, site.contact.email || 'our contact email');
  res.render('privacy', { site, companies, policy, fill });
});
// ---- Terms & Conditions ----
app.get('/terms', (req, res) => {
  const fill = (t) =>
    t.replace(/\{name\}/g, site.name).replace(/\{email\}/g, site.contact.email || 'our contact email');
  res.render('terms', { site, companies, terms, fill });
});
// ---- 404 (keep this after all routes) ----
app.use((req, res) => {
  res.status(404).render('404', { site, companies });
});
// Other pages (privacy policy, sub-company pages) will be added later.

app.listen(PORT, () => {
  console.log(`VEXAURIQ site running at http://localhost:${PORT}`);
});