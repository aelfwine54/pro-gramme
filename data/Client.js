class Client {
  constructor (id, prenom, nom, age, adresse, pays, panier) {
    this.id = id;
    this.prenom = prenom;
    this.nom = nom;
    this.age = age;
    this.adresse = adresse;
    this.pays = pays;

    this.panier = panier;
  }
}

module.exports = Client;
