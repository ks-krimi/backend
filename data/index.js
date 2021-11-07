// dummy data
const users = [
  {
    id: 1,
    nom: "FANOMEZANTSOA",
    prenom: "Herifiandry Marc Nico",
    email: "ny.kalash@gmail.com",
    password: "12345",
    level: 1,
  },
  {
    id: 2,
    nom: "RAKOTOHASIMBOLA",
    prenom: "Fanoella",
    email: "fanoella@gmail.com",
    password: "12345",
    level: 0,
  },
  {
    id: 3,
    nom: "RABEMANANJARA",
    prenom: "Kanto",
    email: "kanto@gmail.com",
    password: "12345",
    level: 0,
  },
  {
    id: 4,
    nom: "ANDRIAMALALA",
    prenom: "Marinette",
    email: "marinette@gmail.com",
    password: "12345",
    level: 0,
  },
];

const details = [
  { id: 1, type: "ordinateur", marque: "Acer" },
  { id: 2, type: "imprimante", marque: "HP" },
  { id: 3, type: "casque", marque: "Sony" },
];

const materiels = [
  { id: 1, type: 1, serie: "ordinateur 1", userId: 2 },
  { id: 2, type: 1, serie: "ordinateur 2", userId: 3 },
  { id: 3, type: 1, serie: "ordinateur 3", userId: 4 },
  { id: 4, type: 2, serie: "imprimante 1", userId: 2 },
  { id: 5, type: 2, serie: "imprimante 2", userId: 3 },
  { id: 6, type: 3, serie: "casque 1", userId: 2 },
  { id: 7, type: 3, serie: "casque 2", userId: 3 },
  { id: 8, type: 3, serie: "casque 3", userId: 4 },
  { id: 9, type: 1, serie: "ordinateur 4", userId: null },
  { id: 10, type: 1, serie: "ordinateur 5", userId: null },
  { id: 11, type: 2, serie: "imprimante 3", userId: null },
  { id: 12, type: 3, serie: "casque 4", userId: null },
  { id: 13, type: 3, serie: "casque 5", userId: null },
];

module.exports = { users, details, materiels };
