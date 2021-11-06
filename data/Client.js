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

  // static incrementId() {
  //   if (!this.latestId) {
  //     this.latestId = 1;
  //   } else {
  //     this.latestId++;
  //   }
  //   return this.latestId;
  // }
}

module.exports = Client;
