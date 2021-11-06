const express = require('express');
const { validate, Joi } = require('express-validation');
const gProduits = require('./../util/gestionnaires').gProduits;
const router = express.Router();

const adresseIdValidation = {
  params: Joi.object({
    id: Joi.number().integer().required()
  })
};

const nouveauProduitValidation = {
  body: Joi.object({
    serial: Joi.string().required(),
    nom: Joi.string().required(),
    description: Joi.string().required(),
    prix: Joi.number().required(),
    qte_inventaire: Joi.number().integer().positive().required(),
    categorie: Joi.object({
      id: Joi.number().integer().required()
    }).required()
  })
};

const modifierProduitValidation = {
  params: Joi.object({
    id: Joi.number().integer().required()
  }),
  body: Joi.object({
    serial: Joi.string(),
    nom: Joi.string(),
    description: Joi.string(),
    prix: Joi.number(),
    qte_inventaire: Joi.number().integer().positive(),
    categorie: Joi.object({
      id: Joi.number().integer().required()
    })
  })
};

const rechercherProduitValidation = {
  query: Joi.object({
    serial: Joi.string(),
    nom: Joi.string(),
    description: Joi.string(),
    prix: Joi.number()
  })
};

/**
 * Ajoute un nouveau client. S'utilise avec une requête de type POST.
 * Il faut passer dans le corps de la requête une description complète sous forme de JSON.
 */
router.post('/', validate(nouveauProduitValidation), gProduits.ajouteProduit.bind(gProduits));

/**
 * Retourne l'ensemble des clients. On peut filtrer les résultats.
 * On peut chercher sur le prenom, nom, age, adresse et pays
 * La requête pour filtrer sera de la forme /clients?prenom=bla&nom=blo&age=2&pays=Canada&adresse=adre
 * Attention les espaces ne sont pas permis, il faut les remplacer par %20
 */
router.get('/', validate(rechercherProduitValidation, {}, {}), gProduits.recupereProduit.bind(gProduits));

/**
 * Retourne le client id
 */
router.get('/:id', validate(adresseIdValidation, {}, {}), gProduits.recupereProduit.bind(gProduits));

/**
 * Modifie un client. Le id dans l'adresse est obligatoire. Les autres informations dans le body sont optionnelles.
 * Au moins une devrait toutefois être modifiée, sinon la requête est un peu inutile
 */
router.put('/:id', validate(modifierProduitValidation, {}, {}), gProduits.modifierProduit.bind(gProduits));

/**
 * Efface un client. Attention, c'est permanent!
 */
router.delete('/:id', validate(adresseIdValidation, {}, {}), gProduits.effaceProduit.bind(gProduits));

module.exports = router;
