const { MongoClient } = require("mongodb");

const url = "mongodb+srv://guptaaman9067:6tvEcUo21N9n01kE@cluster0.5mb1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
const dbName = "user";

async function main() {
    try {
        await client.connect();
        console.log("Database connected successfully");

        const db = client.db(dbName);
        console.log(`Connected to database: ${db.databaseName}`);
    } catch (err) {
        console.error("Error connecting to the database:", err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);



