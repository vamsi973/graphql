
export async function createUser(db, { name, email, currency }) {
    const usersCollection = db.collection('users');
    const newUser = { name, email, currency };
    const result = await usersCollection.insertOne(newUser);
    return { _id: result.insertedId, name, email, currency };
}

export async function getUsers(db) {
    const usersCollection = db.collection('users');
    return await usersCollection.find().toArray();
}

export async function getUrls(db) {
    const urls = db.collection('urls');
    return await urls.find().toArray();
}

export async function createUrl(db, { url }) {
    console.log(url);
    const urlsCollection = db.collection('urls');
    const newUrl = { url: url };
    const result = await urlsCollection.insertOne(newUrl);
    console.log(result);
    return { _id: result.insertedId, ...newUrl };
}