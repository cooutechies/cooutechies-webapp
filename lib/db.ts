import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL environment variable is not set");
}

if (!process.env.MONGODB_DATABASE_NAME) {
  throw new Error("MONGODB_DATABASE_NAME environment variable is not set");
}

let clientPromise: Promise<MongoClient>;

const options = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 2,
};

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URL, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(process.env.MONGODB_URL, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE_NAME);

    // Verify connection is healthy
    await db.admin().ping();

    return { client, db };
  } catch (error) {
    throw error;
  }
}
