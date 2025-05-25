import mongoose from "mongoose";
declare global {
  var mongoose: any;
}
let cached = global.mongoose || { conn: null, promise: null };

export default async function connectDB() {
    if(cached.connection) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI!).then((mongoose) => mongoose);
}
try{
    cached.conn = await cached.promise;
}
catch(error){
    console.error("Error connecting mongoDB ",error);
}
return cached.conn;
}