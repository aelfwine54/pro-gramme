const express = require('express');
const path = require('path');

const commerces = require('../data/commerces.json');

var router = express.Router();


router.get('/', function(req, res){
    res.send(commerces)
});

router.get('/:id', function(req, res){
    res.send(commerces[req.params['id']]);
});

module.exports = router