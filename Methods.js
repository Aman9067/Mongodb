const http  = require('http');

const {MongoClient,ObjectId} = require('mongodb');

const uri="mongodb+srv://guptaaman9067:6tvEcUo21N9n01kE@cluster0.5mb1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName="Aman"
const collectionName="testCollection"
let db;
MongoClient.connect(uri,{UseUnifiedTopology:true}).then((client)=>{
    console.log("Connected Successfully");
    db=client.db(dbName);
}).catch((err)=>console.error("Failed to connect with mongodb",err));

const server = http.createServer(async(req,res)=>{
    const {method,url}=req;
    if(url.startsWith('/data')){
        let body='';
        req.on('data',(chunk)=>{
            body +=chunk.toString();
        })
        req.on('end',async()=>{
            const data =body ? JSON.parse(body): {};
            
            if(method==='GET')
            {
                const documents= await db.collection(collectionName).find().toArray();
                res.writeHead(200,{'Content-Type':'application/Json'});
                
                res.end(JSON.stringify(documents));
            }

            else if(method === 'POST')
            {
                const result = await db.collection(collectionName).insertMany(data);
                res.writeHead(201,{'Content-Type':'application/Json'});
                res.end(JSON.stringify({insertId:result.insertId,...data}));
            }

    



            else if (method === 'PUT') {
                    const { id, ...updateData } = data;
    
                    if (!id) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'ID is required for updating.' }));
                        return;
                    }
    
                    const result = await db.collection(collectionName).replaceMany(
                        { _id: new ObjectId(id) },
                        updateData
                    );
    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                }


                else if(method === 'PATCH')
                {
                    const {id,update}=data;
                    const result = await db.collection(collectionName).updateOne 
                    (
                        {_id:new ObjectId(id)},
                    {$set: update}
                    )
                

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
                }


                else if(method === 'DELETE')
                    {
                        const {id}=data;
                        const result = await db.collection(collectionName).deleteOne 
                        (
                            {_id:new ObjectId(id)},
        
                        )
                    
    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                    }




        })
    }
})

const PORT = 3000;
server.listen(PORT,()=>{
    console.log("Server is running of port 3000");
})