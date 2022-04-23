import { gql } from 'apollo-server-express'

export default gql`
  type Technicien {
    id: ID!
    nom: String!
    prenom: String
    contact: String
    maintenances: [Materiel!]
  }

  extend type Query {
    techniciens: [Technicien!]
    technicien(id: ID!): Technicien
  }
`
