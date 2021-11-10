
const GestionClient = require('../gestion/gestionClient');
const GestionProduits = require('../gestion/gestionProduits');
const GestionConnexion = require('../gestion/gestionConnexion');

const CollectionProduit = require('../collection/collectionProduit');
const CollectionClient = require('../collection/collectionClient');
const CollectionCategorie = require('../collection/collectionCategorie');

const cProduit = new CollectionProduit();
cProduit.chargerProduit();

const cClient = new CollectionClient();
cClient.chargerClients();

const cCategorie = new CollectionCategorie();
cCategorie.chargerCategorie();

const gestionnaires = {
  gClients: new GestionClient(cClient, cProduit),
  gProduits: new GestionProduits(cProduit, cCategorie),
  gConnexion: new GestionConnexion(cClient)
};

module.exports = gestionnaires;
