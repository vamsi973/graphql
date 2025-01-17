// src/resolvers/userResolvers.js
import { createUserController, getUsersController, getUrlController, createUrlController } from '../controllers/userController.js';
import { createUrl } from '../models/userModel.js';

export const userResolvers = {
  Query: {
    hello: () => 'Hello, world!',
    users: async (parent, args, { db }) => {
      return await getUsersController(db);
    },
    urls: async (parent, args, { db }) => {
      return await getUrlController(db);
    }
  },
  Mutation: {
    addUser: async (parent, { name, email, currency }, { db }) => {
      return await createUserController(db, { name, email, currency });
    },
    createUrl: async (parent, { url }, { db }) => {
      console.log(url)
      return await createUrlController(db, { url });
    },
  },
};
