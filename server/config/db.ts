import console from 'console';
import mongoose from 'mongoose';

const connectDB = async () =>{
    mongoose.connection.on('connected', async ()=>console.log("MongoDB connected"));

         if(!process.env.MONGODB_URI) 
            throw new Error("MongoDB_URI is not define")

            await mongoose.connect(process.env.MONGODB_URI);
}

export default connectDB;