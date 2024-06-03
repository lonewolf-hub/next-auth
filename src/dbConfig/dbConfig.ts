import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('connected to mongoDb database');
            
        })
        
        connection.on('error', (err)=>{
            console.log('mongoDB connection error please make sure monogdb is running' + err);
            process.exit();
        })
    }
    catch(error){
        console.log("there is error in connecting");
        console.log(error);
        
    }
}