const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const html = require('./routes/html');
const commerces = require('./routes/commerces')


app.use(express.static('client'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use('/html', html);
app.use('/commerces', commerces);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
