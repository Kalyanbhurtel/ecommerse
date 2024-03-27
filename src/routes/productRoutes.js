import express from "express";
const router = express.Router();

// import controllers and middlewares
import * as productController from "../controllers/productController.js";

// routes
router.route('/').get(productController.getAllProducts);

// export
export default router;