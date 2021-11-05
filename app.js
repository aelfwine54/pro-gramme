const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const path = require('path');

const html = require('./routes/html');
const commerces = require('./routes/commerces')
const clients = require('./routes/clients')


app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use('/html', html);
app.use('/commerces', commerces);
app.use('/clients', clients);


app.listen(port, () => console.log(`Pro-gramme écoute au http://localhost:${port}`));
