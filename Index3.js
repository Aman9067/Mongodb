
const {MongoClient} = require("mongodb");
const url="mongodb+srv://guptaaman9067:6tvEcUo21N9n01kE@cluster0.5mb1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
const dbName="user";
async function main(){
try{
  await client.connect();
  console.log("Database Connected Successfully");
  const db=client.db(dbName);
  const userCollection=db.collection("users");

//  collection ko clear krne ke liye ....
    await userCollection.deleteMany({});
    console.log("Existing collection of data is cleared");

    await userCollection.insertMany([
        {_id:2,name:"israr",age:22},
        {_id:3,name:"sumit",age:20},
        {_id:4,name:"ashish",age:21},
        {_id:5,name:"diya",age:18},
    ])
    console.log("Data inserted through InsertMany Method successfully");

}
catch(err){
  console.error(err);
}
finally{
  await client.close();
}
}


main().catch(console.error);

