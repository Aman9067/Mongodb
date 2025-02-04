
const http = require('http');
const {MongoClient,ObjectId} = require('mongodb');

const uri="mongodb+srv://guptaaman9067:6tvEcUo21N9n01kE@cluster0.5mb1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName="Form";
const collectionName="Formcollection";
let db;

MongoClient.connect(uri,{UseUnifiedTopology:true}).then((client)=>{
    console.log("Connected Successfully");
    db=client.db(dbName);
}).catch((err)=>console.error("Failed to connect with mongodb",err));

const server = http.createServer(async(req,res)=>{
    const {method,url}=req;
    if(url.startsWith('/System')){
        let body='';
        req.on('data',(chunk)=>{
            body +=chunk.toString();
        })
        req.on('end',async()=>{
            const data =body ? JSON.parse(body): {};
            
            if(method === ' Post' && (req.url=== "/data" ) )
                {
                    const result = await db.collection(collectionName).insertMany(data);
                    res.writeHead(201,{'Content-Type':'application/Json'});
                    res.end(JSON.stringify({insertId:result.insertId,...data}));
                }

                else  if(method==='GET'  && (req.url=== "/data"))
                    {
                        const documents= await db.collection(collectionName).find().toArray();
                        res.writeHead(200,{'Content-Type':'application/Json'});
                        
                        res.end(JSON.stringify(documents));
                    }
    
                     
        })
    }
})

const PORT = 3000;
server.listen(PORT,()=>{
    console.log("Server is running of port 3000");
})