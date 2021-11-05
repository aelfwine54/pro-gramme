const express = require('express');

const coll = require('../collection/collectionClient')//TODO passer par le gestionnaire
const Client = require('../data/Client')

coll.charger();

var router = express.Router();

/**
 * Ajoute un nouveau client. S'utilise avec une requête de type POST.
 * Il faut passer dans le corps de la requête une description complète sous forme de JSON.
 */
router.post('/', function(req, res){
    let c = new Client(0, req.body.prenom, req.body.nom, req.body.age, req.body.adresse, req.body.pays, [])
    coll.ajouterClient(c);
    res.send(JSON.stringify(c));
});

/**
 * Retourne l'ensemble des clients
 */
router.get('/', function(req, res){
    res.send(coll.recupereClient());
});


module.exports = router;