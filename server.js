import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

// import routes
import authRoutes from "./src/routes/authRoutes.js";
// import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

// import middlewares
import ErrorMiddleware from "./src/middlewares/errorMiddleware.js";
import { configCloudinary } from "./src/config/cloudinary.js";

// express app
const app = express();

// config
dotenv.config({ path: '.env' });
configCloudinary();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => res.send("Welcome to Node JS!"));
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);

// error middleware
app.use(ErrorMiddleware);

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
});
