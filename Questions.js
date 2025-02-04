
const http = require('http');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://guptaaman9067:6tvEcUo21N9n01kE@cluster0.5mb1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "Class";
const collectionName = "ClassCollection";
let db;

MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(async (client) => {
        console.log("Connected Successfully to MongoDB");
        db = client.db(dbName);


        const collections = await db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) {
            await db.createCollection(collectionName);
            console.log(`Collection "${collectionName}" created successfully.`);
        } else {
            console.log(`Collection "${collectionName}" already exists.`);
        }
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });


const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    if (url.startsWith('/output')) {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const output = body ? JSON.parse(body) : {};

                // if (method === 'GET') {

                //     const documents = await db.collection(collectionName).find().toArray();
                //     res.writeHead(200, { 'Content-Type': 'application/json' });
                //     res.end(JSON.stringify(documents));

                // }
            
                if (method === 'POST') 
                {

                    if (!Array.isArray(output)) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Input should be an array of documents" }));
                        return;
                    }
                    const result = await db.collection(collectionName).insertMany(output);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ insertedIds: result.insertedIds }));
                } else 
                {

                    res.writeHead(405, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: `Method ${method} not allowed` }));
                }



            } catch (err) {
                console.error("Error handling request:", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Internal Server Error" }));
            }
        });





    } else {

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
