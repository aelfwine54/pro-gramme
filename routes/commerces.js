const express = require('express');

const commerces = require('../data/repo/commerces.json');

const router = express.Router();

/**
 * Récupère l'ensemble des commerces
 */
router.get('/', function(req, res) {
  res.send(commerces);
});

/**
 * Récupère le commerce ayant l'id :id. S'utilise comme /commerces/3
 */
router.get('/:id', function(req, res) {
  res.send(commerces[req.params.id]);
});

module.exports = router;
