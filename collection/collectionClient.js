const fs = require('fs');

let Client = require('../data/Client');
const path = require("path");

const liste_clients = []
const CHEMIN_PAR_DEFAUT = path.join(__dirname + '/../data/clients.json');

/**
 * Charge les clients depuis le fichier
 * @param fichier Chemin complet vers un fichier, optionnel
 */
const chargerClients = function (fichier){
    try {
        liste_clients.length = 0;

        let chemin = fichier || CHEMIN_PAR_DEFAUT;
        console.log("Chargement des clients depuis " + chemin);

        fs.readFile(chemin,{flag: 'r'}, (err, data) => {
            if (err && err.errno === -4058) {
                console.log("Le fichier n'existe pas, la liste des clients sera vide");
            }
            else if(data.length > 0 ) {
                let liste = JSON.parse(data);
                for (let elem in liste) {
                    let c = liste[elem];
                    liste_clients.push(new Client(c.id, c.prenom, c.nom, c.age, c.adresse, c.pays, c.panier))
                }
            }
        });

        //Trouve le dernier id et le donne au générateur automatique
        let dernier_elem = liste_clients.slice(-1)[0]
        if(dernier_elem){
            Client.latestId = dernier_elem.id;
        }
    }
    catch (err){
        console.log('Erreur dans le chargement des clients');
    }
}

/**
 * Retourne les clients
 * @param id Optionnel, pour avoir un seul client au lieu de toute la liste
 * @returns {*[]|*}
 */
const recupereClient = function (id){
    if(id === undefined){
        return liste_clients;
    }
    else{
        return  liste_clients[id]
    }

}

/**
 * Fait une recherche sur les clients et retournes ceux qui correspondent
 * @param prenom prenom à trouver ou null pour ne pas le considérer
 * @param nom nom à trouver ou null pour ne pas le considérer
 * @param age age à trouver ou null pour ne pas le considérer
 * @param adresse adresse à trouver ou null pour ne pas le considérer
 * @param pays pays à trouver ou null pour ne pas le considérer
 * @returns {*[]} Liste des clients qui correspondent
 */
const rechercheClient = function(prenom, nom, age, adresse, pays){
    let liste_locale = [...liste_clients]
    if(prenom){ //sera vrai si prenom n'est pas: null, undefined, NaN, empty string (""), 0, false
        liste_locale = liste_locale.filter(function(elem) {
            return elem.prenom === prenom
        })
    }
    if(nom){
        liste_locale = liste_locale.filter(function(elem) {
            return elem.nom === nom
        })
    }
    if(age){
        liste_locale = liste_locale.filter(function(elem) {
            return elem.age === age
        })
    }
    if(adresse){
        liste_locale = liste_locale.filter(function(elem) {
            return elem.adresse === adresse
        })
    }
    if(pays){
        liste_locale = liste_locale.filter(function(elem) {
            return elem.pays === pays
        })
    }
    return liste_locale;
}

/**
 * Fonction interne. Sauvegarde les fichiers sur le disque
 * @param fichier Optionnel chemin vers un fichier de sauvegarde
 */
function sauvegarder(fichier){

    let chemin = fichier || CHEMIN_PAR_DEFAUT;
    let data = JSON.stringify(liste_clients, null, 4)
    try {
        fs.writeFile(chemin, data,{flag: 'w+'}, (err) => {
            if (err) throw err;
            console.log('Clients enregistrés dans le fichier ' + chemin);
        });
    }
    catch (err){
        console.log("Erreur dans l'enregistrement du fichier");
        console.log(err.message)
    }

}

/**
 * Ajoute un client
 * @param client instance de la classe Client
 */
const ajouterClient = function(client){
    liste_clients.push(client);
    sauvegarder();
}

/**
 * Efface un client
 * @param client instance de client
 */
const effacerClient = function(client){
    liste_clients.splice(liste_clients.findIndex(item => item.id === client.id), 1)
}

/**
 * Modifie un client
 * @param nouveauClient Instance de client. L'ID doit être le même que sur le disque.
 *                      Chacun des autres champs peut être nul s'il n'est pas modifié
 */
const modifierClient = function(nouveauClient){
    objIndex = liste_clients.findIndex((obj => obj.id === nouveauClient.id));
    if(objIndex > -1) { //S'il n'est pas trouvé l'index sera -1
        if (nouveauClient.prenom)
            liste_clients[objIndex].prenom = nouveauClient.prenom;
        if (nouveauClient.nom)
            liste_clients[objIndex].nom = nouveauClient.nom;
        if (nouveauClient.age)
            liste_clients[objIndex].age = nouveauClient.age;
        if (nouveauClient.adresse)
            liste_clients[objIndex].adresse = nouveauClient.adresse;
        if (nouveauClient.pays)
            liste_clients[objIndex].pays = nouveauClient.pays;
    }
}

module.exports.charger = chargerClients;
module.exports.recupereClient = recupereClient;
module.exports.rechercheClient = rechercheClient;
module.exports.ajouterClient = ajouterClient;
module.exports.effacerClient = effacerClient;
module.exports.modifierClient = modifierClient;