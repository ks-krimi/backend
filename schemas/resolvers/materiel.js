import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import Detail from '../../models/Detail'
import Materiel from '../../models/Materiel'
import User from '../../models/User'

export default {
  AllowedStatus: {
    EN_MARCHE: 'en marche',
    EN_PANNE: 'en panne'
  },

  Materiel: {
    detail: async (materiel) => {
      return await Detail.findById(materiel.detailId)
    },
    user: async (materiel) => {
      return await User.findById(materiel.userId)
    }
  },

  Detail: {
    materiels: async (detail) => {
      return await Materiel.find({ detailId: detail.id })
    }
  },

  Query: {
    materiels: async (root, args, context, info) => {
      return await Materiel.find()
    },

    materiel: async (root, args, context, info) => {
      const isObjectIdOrHexString = mongoose.isValidObjectId(args.id)
      if (!isObjectIdOrHexString) {
        throw new UserInputError('Invalid input value')
      }

      const materiel = await Materiel.findById(args.id)

      if (!materiel) {
        throw new UserInputError('Invalid input value')
      }

      return materiel
    },

    details: async (root, args, context, info) => {
      return await Detail.find()
    },

    detail: async (root, args, context, info) => {
      const isObjectIdOrHexString = mongoose.isValidObjectId(args.id)
      if (!isObjectIdOrHexString) {
        throw new UserInputError('Invalid input value')
      }

      const detail = await Detail.findById(args.id)

      if (!detail) {
        throw new UserInputError('Invalid input value')
      }

      return detail
    }
  }
}
