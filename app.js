const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const ValidationError = require('express-validation').ValidationError;

const html = require('./routes/html');
const commerces = require('./routes/commerces');
const clients = require('./routes/clients');
const categories = require('./routes/categories');
const produits = require('./routes/produits');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    const errorMessages = err.details.map(el => el.message);
    console.log(errorMessages);
    return res.status(err.statusCode).json(errorMessages);
  }
  return res.status(500).json(err);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use('/html', html);
app.use('/commerces', commerces);
app.use('/clients', clients);
app.use('/categories', categories);
app.use('/produits', produits);

app.listen(port, () => console.log(`Pro-gramme écoute au http://localhost:${port}`));
