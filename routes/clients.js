const express = require('express');

const GestionClient = require('./../gestion/gestionClient');

const { validate, Joi } = require('express-validation');

// const loginValidation = {
//   body: Joi.object({
//     email: Joi.string()
//       .email()
//       .required(),
//     password: Joi.string()
//       .regex(/[a-zA-Z0-9]{3,30}/)
//       .required(),
//   }),
// };

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

const router = express.Router();
const gClient = new GestionClient();

/**
 * Ajoute un nouveau client. S'utilise avec une requête de type POST.
 * Il faut passer dans le corps de la requête une description complète sous forme de JSON.
 */
router.post('/', validate(nouveauClientValidation), gClient.ajouteClient.bind(gClient));

/**
 * Retourne l'ensemble des clients. On peut filtrer les résultats.
 * On peut chercher sur le prenom, nom, age, adresse et pays
 * La requête pour filtrer sera de la forme /clients?prenom=bla&nom=blo&age=2&pays=Canada&adresse=adre
 * Attention les espaces ne sont pas permis, il faut les remplacer par %20
 */
router.get('/', validate(rechercherClientValidation, {}, {}), gClient.recupereClient.bind(gClient));

/**
 * Retourne le client id
 */
router.get('/:id', validate(adresseIdValidation, {}, {}), gClient.recupereClient.bind(gClient));

/**
 * Modifie un client. Le id dans l'adresse est obligatoire. Les autres informations dans le body sont optionnelles.
 * Au moins une devrait toutefois être modifiée, sinon la requête est un peu inutile
 */
router.put('/:id', validate(modifierClientValidation, {}, {}), gClient.modifierClient.bind(gClient));

/**
 * Efface un client. Attention, c'est permanent!
 */
router.delete('/:id', validate(adresseIdValidation, {}, {}), gClient.effaceClient.bind(gClient));

module.exports = router;
