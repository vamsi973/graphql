// src/app.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectToMongoDB } from './db/connect.js';
import { typeDefs } from './schema/typeDefs.js';
import { userResolvers } from './resolvers/userResolvers.js';
import 'dotenv/config';

const app = express();

const mongoUri = process.env.DATABASE_URL;
const dbName = process.env.DATABASE_NAME;

let db;

// Connect to MongoDB
connectToMongoDB(mongoUri, dbName).then(async (connectedDb) => {
    db = connectedDb;

    const server = new ApolloServer({
        typeDefs,
        resolvers: userResolvers,
        context: { db },
    });

    await server.start();

    server.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(`🚀  Server running at http://localhost:4000`);
        console.log(`GraphQL available at http://localhost:4000/graphql`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
