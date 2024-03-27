import express from "express";
const router = express.Router();

// import controllers and middlewares
import * as authControllers from "../controllers/authController.js";

// define routes
router.route('/register').post(authControllers.registerUser);
router.route('/login').post(authControllers.loginUser);
router.route('/logout').get(authControllers.logoutUser);

// export router
export default router;
