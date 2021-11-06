const Client = require('../data/Client');
const CollectionClient = require('../collection/collectionClient');

class GestionClient {
  constructor() {
    this.collectionClient = new CollectionClient();
    this.collectionClient.chargerClients();
  }

  /**
   * Efface un client avec son ID. Irréversible.
   * @param req
   * @param res
   */
  effaceClient(req, res) {
    const id = parseInt(req.params.id);
    const c = this.collectionClient.recupereClient(id);
    if (!c) {
      res.status(400).send(`Le client avec l'id ${id} n'a pas été trouvé`);
    } else {
      this.collectionClient.effacerClient(c);
      res.status(200).send();
    }
  }

  /**
   * Ajoute un client tous les champs devoient être là.
   * @param req
   * @param res
   */
  ajouteClient(req, res) {
    // Il faudrait vérifier que la pays est valide et que l'adresse existe. Une autre fois peut-être
    const c = new Client(-1, req.body.prenom, req.body.nom, parseInt(req.body.age), req.body.adresse, req.body.pays, []);
    this.collectionClient.ajouterClient(c);
    res.send(JSON.stringify(c));
  }

  /**
   * Modifie un client. L'ID doit être là, les autres champs du client sont optionels, ceux qui sont là seront mis à jour
   * @param req
   * @param res
   */
  modifierClient(req, res) {
    const id = parseInt(req.params.id);
    const c = this.collectionClient.recupereClient(id);
    if (!c) {
      res.status(400).send(`Le client avec l'id ${id} n'a pas été trouvé`);
      return;
    }
    // Il faudrait vérifier que la pays est valide et que l'adresse existe. Une autre fois peut-être
    c.prenom = req.body.prenom;
    c.nom = req.body.nom;
    c.age = parseInt(req.body.age);
    c.adresse = req.body.adresse;
    c.pays = req.body.pays;
    res.send(this.collectionClient.modifierClient(c));
  }

  /**
   * Méthode commune pour retourner un ou des clients dont l'ID est connu.
   * Appelé par /clients retournera alors tous les clients. Peut être filtrée avec des ?clé=valeur
   * Appelé par /clients/id retournera alors le client avec l'id spécifié
   * @param req
   * @param res
   */
  recupereClient(req, res) {
    // S'il y a des éléments dans query, alors c'est une recherche
    if (Object.keys(req.query).length > 0) {
      const prenom = req.query.prenom;
      const nom = req.query.nom;
      const age = parseInt(req.query.age);
      const adresse = req.query.adresse;
      const pays = req.query.pays;

      res.send(this.collectionClient.rechercheClient(prenom, nom, age, adresse, pays));
    } else { // sinon c'est un get avec ID ou sans contrainte
      let id = req.params.id || -1;
      id = parseInt(id);
      res.send(this.collectionClient.recupereClient(id));
    }
  }
}

module.exports = GestionClient;
