const express = require('express');
const GestionProduit = require('./../gestion/gestionProduits');
const { validate, Joi } = require('express-validation');
const router = express.Router();

const adresseIdValidation = {
  params: Joi.object({
    id: Joi.number().integer().required()
  })
};

const nouvelleCategorieValidation = {
  body: Joi.object({
    nom: Joi.string().required(),
    description: Joi.string().required()
  })
};

const modifierCategorieValidation = {
  params: Joi.object({
    id: Joi.number().integer().required()
  }),
  body: Joi.object({
    nom: Joi.string(),
    description: Joi.string()
  })
};

const rechercherCategorieValidation = {
  query: Joi.object({
    nom: Joi.string(),
    description: Joi.string()
  })
};

const gProduit = new GestionProduit();

/**
 * Ajoute une nouvelle catégorie. S'utilise avec une requête de type POST.
 * Il faut passer dans le corps de la requête une description complète sous forme de JSON.
 */
router.post('/', validate(nouvelleCategorieValidation), gProduit.ajouteCategorie.bind(gProduit));

/**
 * Retourne l'ensemble des catégories. On peut filtrer les résultats.
 * On peut chercher sur le nom,  et description
 * La requête pour filtrer sera de la forme /categories?&nom=blo&description=texte
 * Attention les espaces ne sont pas permis, il faut les remplacer par %20
 */
router.get('/', validate(rechercherCategorieValidation, {}, {}), gProduit.recupereCategorie.bind(gProduit));

/**
 * Retourne la categorie ayant l'id id
 */
router.get('/:id', validate(adresseIdValidation, {}, {}), gProduit.recupereCategorie.bind(gProduit));

/**
 * Modifie une categorie. Le id dans l'adresse est obligatoire. Les autres informations dans le body sont optionnelles.
 * Au moins une devrait toutefois être modifiée, sinon la requête est un peu inutile
 */
router.put('/:id', validate(modifierCategorieValidation, {}, {}), gProduit.modifierCategorie.bind(gProduit));

/**
 * Efface une categorie. Attention, c'est permanent!
 */
router.delete('/:id', validate(adresseIdValidation, {}, {}), gProduit.effaceCategorie.bind(gProduit));

module.exports = router;
