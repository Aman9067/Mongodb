const uri="mongodb+srv://guptaaman9067:6tvEcUo21N9n01kE@cluster0.5mb1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let {MongoClient}=require("mongodb");
let client=new MongoClient(uri);

let insert=async()=>{
    try {
        await client.connect();
        let db=client.db("database");
        let userCollection=db.collection("userdata");
        let orderCollection=db.collection("orderdata");
        let produCtCollection=db.collection("productdata");

        // await userCollection.insertMany([
        //     { _id: 1, name: "Raj", age: 28, city: "Delhi" },
        //     { _id: 2, name: "Simran", age: 35, city: "Mumbai" },
        //     { _id: 3, name: "Amit", age: 24, city: "Bangalore" }
        // ])

        // await orderCollection.insertMany([
        //     { orderId: 101, userId: 1, productName: "Laptop", price: 800, total: 800 },
        //     { orderId: 102, userId: 2, productName: "Smartphone", price: 500,  total: 500 },
        //     { orderId: 103, userId: 1, productName: "Keyboard", price: 100, total: 100 },
        //     { orderId: 104, userId: 3, productName: "Tablet", price: 450,  total: 450 }
        // ])

        // await produCtCollection.insertMany([
        //     { productId: 201, productName: "Laptop", category: "Electronics" },
        //     { productId: 202, productName: "Smartphone", category: "Electronics" },
        //     { productId: 203, productName: "Keyboard", category: "Electronics" },
        //     { productId: 204, productName: "Tablet", category: "Electronics" }
        // ])

    //    let result= await orderCollection.find({price:{$gt:90}}).toArray()
    //    console.log(result);
       
    
    // }]
    //  ).toArray();



    //  console.log(avg);


// let result = await produCtCollection.aggregate([{
//     $lookup:{
//         from:"orderdata",
//         localField:"productName",
//          foreignField:"productName",
//          as:"ProductDetails"
//     }, 
    
//             $match:{
//                 "ProductDetails.pr":{$gt:50},
                
//             }


let result = await userCollection.aggregate([{
        $lookup:{
            from:"orderdata",
            localField:"_id",
             foreignField:"userId",
             as:"orderDetails"
        } 
    },
       { 
        $unwind:{
            path:"$orderDetails",
            preserveNullAndEmptyArrays:true
        }
       },


]).toArray();
console.log(result)
    
   
    } catch (error) {
        console.log("connection failed",error);
        
        
    }
    finally{
        await client.close();
    }
}
insert();