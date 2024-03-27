import express from "express";
const router = express.Router();

// import controllers and middlewares
import * as adminController from "../controllers/adminController.js";
import { uploadSingle } from "../middlewares/multerMiddleware.js";

// define routes
router.route('/products').post(uploadSingle, adminController.addProduct);
router.route('/products/:id').patch(uploadSingle, adminController.updateProduct);
router.route('/products/:id').delete(adminController.deleteProduct);


// export 
export default router;
