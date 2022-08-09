import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
// import userRouter from "./routes/userRoutes/user.route.js";
// import productRouter from "./routes/listRoutes/list.route.js"

const app = express();

app.use(express.json());
dotenv.config();
dbConnect();

// app.use('/user', userRouter)
// app.use('/products', productRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server runnung on port: ${PORT}!`));