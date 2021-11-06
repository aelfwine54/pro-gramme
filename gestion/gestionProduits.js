const Produit = require('../data/Produit');
const Categorie = require('../data/Categorie');

const CollectionCategorie = require('../collection/collectionCategorie');
const CollectionProduit = require('../collection/collectionProduit');

class GestionProduit {
  constructor() {
    this.collectionCategorie = new CollectionCategorie();
    this.collectionProduit = new CollectionProduit();
    this.collectionCategorie.chargerCategorie();
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
    // Il faudrait vérifier que la pays est valide et que l'adresse existe. Une autre fois peut-être
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
}

module.exports = GestionProduit;
