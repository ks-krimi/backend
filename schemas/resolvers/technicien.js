import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import Technicien from '../../models/Technicien'
import Materiel from '../../models/Materiel'

export default {
  Technicien: {
    maintenances: async (technicien, args, context, info) => {
      return await Materiel.find({ technicienId: technicien.id })
    }
  },

  Query: {
    techniciens: async (root, args, context, info) => {
      return await Technicien.find()
    },

    technicien: async (root, args, context, info) => {
      const isObjectIdOrHexString = mongoose.isValidObjectId(args.id)
      if (!isObjectIdOrHexString) {
        throw new UserInputError('Invalid input value')
      }

      return await Technicien.findById(args.id)
    }
  }
}
