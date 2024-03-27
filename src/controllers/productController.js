import pool from "../config/db.js";
import { asyncHandler } from "../util/asyncHandler.js";

// add prooduct
export const getAllProducts = asyncHandler(async (req, res, next) => {
    const [rows] = await pool.query("SELECT * FROM Product");
    
    res.status(200).json({
        success: true,
        data: {
            count: rows.length,
            products: rows
        }
    });
});