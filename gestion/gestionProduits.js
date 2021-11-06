const Produit = require('../data/Produit');
const Categorie = require('../data/Categorie');

const CollectionCategorie = require('../collection/collectionCategorie');
const CollectionProduit = require('../collection/collectionProduit');

class GestionProduits {
  constructor() {
    this.collectionCategorie = new CollectionCategorie();
    this.collectionProduit = new CollectionProduit();
    this.collectionCategorie.chargerCategorie();
    this.collectionProduit.chargerProduit();
  }

  /**
   * Efface une categorie avec son ID. Irréversible.
   * @param req
   * @param res
   */
  effaceCategorie(req, res) {
    const id = parseInt(req.params.id);
    const c = this.collectionCategorie.recupereCategorie(id);
    if (!c) {
      res.status(400).send(`La catégorie avec l'id ${id} n'a pas été trouvé`);
    } else {
      this.collectionCategorie.effacerCategorie(c);
      res.status(200).send();
    }
  }

  /**
   * Ajoute une catégorie. Tous les champs devoient être là.
   * @param req
   * @param res
   */
  ajouteCategorie(req, res) {
    const c = new Categorie(-1, req.body.nom, req.body.description);
    this.collectionCategorie.ajouterCategorie(c);
    res.send(JSON.stringify(c));
  }

  /**
   * Modifie une catégorie. L'ID doit être là, les autres champs de la catégorie sont optionels,
   * ceux qui sont là seront mis à jour
   * @param req
   * @param res
   */
  modifierCategorie(req, res) {
    const id = parseInt(req.params.id);
    const c = this.collectionCategorie.recupereCategorie(id);
    if (!c) {
      res.status(400).send(`La catégorie avec l'id ${id} n'a pas été trouvée`);
      return;
    }
    c.nom = req.body.nom;
    c.description = req.body.description;
    res.send(this.collectionCategorie.modifierCategorie(c));
  }

  /**
   * Méthode commune pour retourner un ou des catégorie.
   * Appelé par /categories retournera alors toutes les categories. Peut être filtrée avec des ?clé=valeur
   * Appelé par /categories/id retournera alors la catégorie avec l'id spécifié
   * @param req
   * @param res
   */
  recupereCategorie(req, res) {
    // S'il y a des éléments dans query, alors c'est une recherche
    if (Object.keys(req.query).length > 0) {
      const nom = req.query.nom;
      const description = req.query.description;

      res.send(this.collectionCategorie.rechercheCategorie(nom, description));
    } else { // sinon c'est un get avec ID ou sans contrainte
      let id = req.params.id || -1;
      id = parseInt(id);
      res.send(this.collectionCategorie.recupereCategorie(id));
    }
  }

  /**
   * Efface un produit avec son ID. Irréversible.
   * @param req
   * @param res
   */
  effaceProduit(req, res) {
    const id = parseInt(req.params.id);
    const c = this.collectionProduit.recupereProduit(id);
    if (!c) {
      res.status(400).send(`Le produit avec l'id ${id} n'a pas été trouvé`);
    } else {
      this.collectionProduit.effacerProduit(c);
      res.status(200).send();
    }
  }

  /**
   * Ajoute un produit. Tous les champs devoient être là.
   * @param req
   * @param res
   */
  ajouteProduit(req, res) {
    // TODO verifier que la catégorie existe
    const c = new Produit(-1, req.body.serial, req.body.nom, req.body.description, req.body.prix, parseInt(req.body.qte_inventaire), req.body.qte_inventaire);
    this.collectionProduit.ajouterProduit(c);
    res.send(JSON.stringify(c));
  }

  /**
   * Modifie un produit. L'ID doit être là, les autres champs de le produit sont optionels,
   * ceux qui sont là seront mis à jour
   * @param req
   * @param res
   */
  modifierProduit(req, res) {
    const id = parseInt(req.params.id);
    const c = this.collectionProduit.recupereProduit(id);
    if (!c) {
      res.status(400).send(`Le produit avec l'id ${id} n'a pas été trouvé`);
      return;
    }
    c.serial = req.body.serial;
    c.nom = req.body.nom;
    c.description = req.body.description;
    c.prix = req.body.prix;
    c.qte_inventaire = parseInt(req.body.qte_inventaire);
    c.categorie = req.body.categorie; // TODO valider que ca existe
    res.send(this.collectionProduit.modifierProduit(c));
  }

  /**
   * Méthode commune pour retourner un ou des produits.
   * Appelé par /produits retournera alors tous les produits. Peut être filtrée avec des ?clé=valeur
   * Appelé par /produits/id retournera alors le produit avec l'id spécifié
   * @param req
   * @param res
   */
  recupereProduit(req, res) {
    // S'il y a des éléments dans query, alors c'est une recherche
    if (Object.keys(req.query).length > 0) {
      const serial = req.query.serial;
      const nom = req.query.nom;
      const description = req.query.description;
      const prix = req.query.prix;
      const qteInventaire = parseInt(req.query.qte_inventaire);
      const categorie = req.query.categorie;

      res.send(this.collectionProduit.rechercheProduit(serial, nom, description, prix, qteInventaire, categorie));
    } else { // sinon c'est un get avec ID ou sans contrainte
      const id = parseInt(req.params.id) || -1;
      res.send(this.collectionProduit.recupereProduit(id));
    }
  }
}

module.exports = GestionProduits;
