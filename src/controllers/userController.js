
import { createUser, getUsers, createUrl, getUrls } from '../models/userModel.js';

export const createUserController = async (db, args) => {
  return await createUser(db, args);
};

export const getUsersController = async (db) => {
  return await getUsers(db);
};

export const getUrlController = async (db) => {
  return await getUrls(db);
}

export const createUrlController = async (db, args) => {
  return await createUrl(db, args);
};