class Produit {
    constructor (serial, nom, description, prix, inventaire) {
        this.serial = serial;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.inventaire = inventaire;
    }
}

module.exports = Produit;
