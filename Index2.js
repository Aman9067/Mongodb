const { MongoClient } = require("mongodb");
const url = "mongodb+srv://guptaaman9067:6tvEcUo21N9n01kE@cluster0.5mb1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbName = "user";

async function main() {
    try {
        await client.connect();
    
        console.log("Database connected successfully");
        const db=client.db(dbName);
        const userCollection = db.collection("users");
        console.log("Inserting data in users collections")

        await userCollection.deleteMany({});
    console.log("Existing collection of data is cleared");
        await userCollection.insertMany([
            {_id:1,name:"Aryan",age:33},
            {_id:2,name:"Aman",age:30},
            {_id:3,name:"Shahil",age:20},
        ])

        console.log("data inserted successfully")

    } catch (err) {
        console.error("Error connecting to the database:", err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);