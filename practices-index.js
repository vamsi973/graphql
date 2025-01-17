import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import {MongoClient} from 'mongodb';
import 'dotenv/config'


const mongoUri = process.env.DATABASE_URL;
const dbName = process.env.DATABASE_NAME;

let db;


// Connect to MongoDB
async function connectToMongoDB() {
    try {
        const client = new MongoClient(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        db = client.db(dbName); // Set db reference to the database
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }

}

// Call the function to connect to MongoDB
connectToMongoDB();
const app = express();


const typeDefs = gql`
  type Query {
    hello: String
    users: [User]
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    currency:String!
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
        users: async () => {
            try {
                const usersCollection = db.collection('users');
                const users = await usersCollection.find().toArray(); // Ensure this returns an array
                return users; // Return the array of users
            } catch (error) {
                console.error('Error fetching users from MongoDB:', error);
                return []; // Return an empty array in case of an error
            }
        },

    },
    Mutation: {
        addUser: async (parent, data) => {
            console.log("name", data.name);
            console.log("email", data.email);

            try {
                const usersCollection = db.collection('users');
                const newUser = {...data};
                const result = await usersCollection.insertOne(newUser);
                console.log({ id: result.insertedId, ...newUser});
                return { id: result.insertedId, ...newUser};
            } catch (error) {
                console.error('Error adding user to MongoDB:', error);
                throw new Error('Error adding user');
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    await server.start(); // Start the Apollo Server before applying middleware
    server.applyMiddleware({app}); // Apply Apollo middleware to Express app

    // Start the Express server on port 4000
    app.listen(4000, () => {
        console.log(`🚀  Server running at http://localhost:4000`);
        console.log(`GraphQL available at http://localhost:4000/graphql`);
    });
}

console.log(process.env.SECRET_KEY);

// Call the startServer function to initialize everything
startServer().catch((error) => {
    console.error('Error starting the server:', error);
});