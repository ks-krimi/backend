import { gql } from 'apollo-server-express'

export default gql`
  enum AllowedStatus {
    EN_MARCHE
    EN_PANNE
  }

  type Detail {
    id: ID!
    type: String!
    marque: String!
    materiels: [Materiel!]
  }

  type Materiel {
    id: ID!
    serie: String!
    detail: Detail
    user: User
    status: AllowedStatus
  }

  extend type Query {
    materiels: [Materiel!]
    materiel(id: ID!): Materiel
    details: [Detail!]
    detail(id: ID!): Detail
  }
`
