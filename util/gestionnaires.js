
const GestionClient = require('../gestion/gestionClient');
const GestionProduits = require('../gestion/gestionProduits');

const gestionnaires = {
  gClients: new GestionClient(),
  gProduits: new GestionProduits()
};

module.exports = gestionnaires;
