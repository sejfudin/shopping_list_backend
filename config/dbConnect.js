import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`DB connected Successfully`)
    } catch (error) {
        console.log(`Error ${error.message}`)
    }
}

export default dbConnect;