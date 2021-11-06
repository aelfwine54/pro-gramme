const express = require('express');
const gClients = require('./../util/gestionnaires').gClients;
const { validate, Joi } = require('express-validation');

const router = express.Router();

const adresseIdValidation = {
  params: Joi.object({
    id: Joi.number().integer().required()
  })
};

const nouveauClientValidation = {
  body: Joi.object({
    prenom: Joi.string().required(),
    nom: Joi.string().required(),
    age: Joi.number().integer().positive().required(),
    adresse: Joi.string().required(),
    pays: Joi.string().required()
  })
};

const modifierClientValidation = {
  params: Joi.object({
    id: Joi.number().integer().required()
  }),
  body: Joi.object({
    prenom: Joi.string(),
    nom: Joi.string(),
    age: Joi.number().integer().positive(),
    adresse: Joi.string(),
    pays: Joi.string()
  })
};

const rechercherClientValidation = {
  query: Joi.object({
    prenom: Joi.string(),
    nom: Joi.string(),
    age: Joi.number().integer().positive(),
    pays: Joi.string(),
    adresse: Joi.string()
  })
};

/**
 * Ajoute un nouveau client. S'utilise avec une requête de type POST.
 * Il faut passer dans le corps de la requête une description complète sous forme de JSON.
 */
router.post('/', validate(nouveauClientValidation), gClients.ajouteClient.bind(gClients));

/**
 * Retourne l'ensemble des clients. On peut filtrer les résultats.
 * On peut chercher sur le prenom, nom, age, adresse et pays
 * La requête pour filtrer sera de la forme /clients?prenom=bla&nom=blo&age=2&pays=Canada&adresse=adre
 * Attention les espaces ne sont pas permis, il faut les remplacer par %20
 */
router.get('/', validate(rechercherClientValidation, {}, {}), gClients.recupereClient.bind(gClients));

/**
 * Retourne le client id
 */
router.get('/:id', validate(adresseIdValidation, {}, {}), gClients.recupereClient.bind(gClients));

/**
 * Modifie un client. Le id dans l'adresse est obligatoire. Les autres informations dans le body sont optionnelles.
 * Au moins une devrait toutefois être modifiée, sinon la requête est un peu inutile
 */
router.put('/:id', validate(modifierClientValidation, {}, {}), gClients.modifierClient.bind(gClients));

/**
 * Efface un client. Attention, c'est permanent!
 */
router.delete('/:id', validate(adresseIdValidation, {}, {}), gClients.effaceClient.bind(gClients));

module.exports = router;
