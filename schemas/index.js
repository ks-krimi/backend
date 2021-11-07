const graphql = require("graphql");
const { users, details, materiels } = require("../data");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const DetailType = new GraphQLObjectType({
  name: "Detail",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    marque: { type: GraphQLString },
    materiels: {
      type: new GraphQLList(MaterielType),
      resolve(parent, args) {
        return materiels.filter((materiel) => materiel.type === parent.id);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    nom: { type: GraphQLString },
    prenom: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    level: { type: GraphQLInt },
    materiels: {
      type: new GraphQLList(MaterielType),
      resolve(parent, args) {
        return materiels.filter((materiel) => materiel.userId === parent.id);
      },
    },
  }),
});

const MaterielType = new GraphQLObjectType({
  name: "Materiel",
  fields: () => ({
    id: { type: GraphQLID },
    serie: { type: GraphQLString },
    detail: {
      type: DetailType,
      resolve(parent, args) {
        return details.find((detail) => detail.id === parent.type);
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return users.find((user) => user.id === parent.userId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      },
    },
    details: {
      type: new GraphQLList(DetailType),
      resolve(parent, args) {
        return details;
      },
    },
    materiels: {
      type: new GraphQLList(MaterielType),
      resolve(parent, args) {
        return materiels;
      },
    },
    detail: {
      type: DetailType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return details.find((detail) => detail.id == args.id);
      },
    },
    materiel: {
      type: MaterielType,
      args: { serie: { type: GraphQLString } },
      resolve(parent, args) {
        return materiels.find((materiel) => materiel.serie === args.serie);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return users.find((user) => user.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
