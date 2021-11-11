const graphql = require("graphql");
const userModel = require("../models/User");
const detailModel = require("../models/Detail");
const materielModel = require("../models/Materiel");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const DetailType = new GraphQLObjectType({
  name: "Detail",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    marque: { type: GraphQLString },
    materiels: {
      type: new GraphQLList(MaterielType),
      resolve: async (parent, args) => {
        const materiels = await materielModel.find({ detailId: parent.id });
        return materiels;
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
      resolve: async (parent, args) => {
        const materiels = await materielModel.find({ userId: parent.id });
        return materiels;
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
      resolve: async (parent, args) => {
        const detail = await detailModel.findById(parent.detailId);
        return detail;
      },
    },
    user: {
      type: UserType,
      resolve: async (parent, args) => {
        const user = await userModel.findById(parent.userId);
        return user;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args) => {
        const users = await userModel.find();
        return users;
      },
    },
    details: {
      type: new GraphQLList(DetailType),
      resolve: async (parent, args) => {
        const details = await detailModel.find();
        return details;
      },
    },
    materiels: {
      type: new GraphQLList(MaterielType),
      resolve: async (parent, args) => {
        const materiels = await materielModel.find();
        return materiels;
      },
    },
    detail: {
      type: DetailType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const detail = await detailModel.findById(args.id);
        return detail;
      },
    },
    materiel: {
      type: MaterielType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const materiel = await materielModel.findById(args.id);
        return materiel;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const user = await userModel.findById(args.id);
        return user;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        level: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        try {
          const user = await userModel.create({
            nom: args.nom,
            prenom: args.prenom,
            email: args.email,
            password: args.password,
            level: args.level,
          });
          return user;
        } catch (error) {
          return error;
        }
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        level: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const user = await userModel.findByIdAndUpdate(args.id, args);
        return user;
      },
    },
    deleteUser: {
      type: UserType,
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args) => {
        const user = await userModel.findByIdAndDelete(args.userId);
        return user;
      },
    },
    addDetail: {
      type: DetailType,
      args: { type: { type: GraphQLString }, marque: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const detail = await detailModel.create({
          type: args.type,
          marque: args.marque,
        });
        return detail;
      },
    },
    updateDetail: {
      type: DetailType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: GraphQLString },
        marque: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const detail = await detailModel.findByIdAndUpdate(args.id, args);
        return detail;
      },
    },
    deleteDetail: {
      type: DetailType,
      args: { detailId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args) => {
        const detail = await detailModel.findByIdAndDelete(args.detailId);
        return detail;
      },
    },
    addMateriel: {
      type: MaterielType,
      args: {
        serie: { type: GraphQLString },
        detailId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const materiel = await materielModel.create({
          serie: args.serie,
          detailId: args.detailId,
          userId: args.userId,
        });
        return materiel;
      },
    },
    updateMateriel: {
      type: MaterielType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        serie: { type: GraphQLString },
        detailId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const materiel = await materielModel.findByIdAndUpdate(args.id, args);
        return materiel;
      },
    },
    deleteMateriel: {
      type: MaterielType,
      args: { materielId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args) => {
        const materiel = await materielModel.findByIdAndDelete(args.materielId);
        return materiel;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
