import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    nom: String!
    prenom: String!
    fonction: String
    email: String
    password: String
    level: Int!
    materiels: [Materiel!]
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
  }
`
