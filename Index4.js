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
        const ordersCollection = db.collection("orders")
        // console.log("Inserting data in users collections")
        // await userCollection.insertMany([
        //     {_id:4,name:"Dev",age:33},
        //     {_id:5,name:"Rishabh",age:20},
        //     {_id:6,name:"Shivam",age:25},
        // ])
        await ordersCollection.insertMany([
            {orderid:101,userId:2,item:"Laptop",price:1200},
            {orderid:102,userId:3,item:"Mouse",price:1800},
            {orderid:103,userId:4,item:"Keyboard",price:1400}
        ])


        const result = await userCollection.aggregate([
            {
                $lookup:{
                    from : "orders" , // Target
                    localField:"_id" , // parent collection name 
                    foreignField:"userId",
                    as:"orderDetails" // want to store as a result
                }
            }
,{
                $unwind:{
                    path:"$orderDetails",
                    preserveNullAndEmptyArrays:true
                }
            },
            // {
            //     $match:{
            //         "orderDetails.price":{$gt:1500},
                    
            //     }
            // },
            {
                $group:{
                    _id : "$_id", // user Collection
                    coutOrders:{$sum:2}, // Sum of Total Orders orderCollection
                    totalSpent:{$sum:"$orderDetails.price"} // Sum of Price // orderCollection
                }
            }

        ]).toArray();
        console.log(result);

    } catch (err) {
        console.error("Error connecting to the database:", err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);