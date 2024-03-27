import {v2 as cloudinary} from "cloudinary";
import { asyncHandler } from "../util/asyncHandler.js";
import ErrorHandler from "../util/errorHandler.js";
import pool from "../config/db.js";

// add prooduct
export const addProduct = asyncHandler(async (req, res, next) => {
    const { name, price, description, stock, discount } = req.body;

    if (!name || !price || !description || !stock) {
        return next(new ErrorHandler(400, "Please fill in all required fields."));
    }

    // image file
    const imageFile = req.file;
    if (!imageFile) {
        return next(new ErrorHandler(400, "Please provide an image"));
    }

    // insert imageFile in cloudinary 
    const extname = imageFile.originalname.split(".")[1];
    const img = `data:image/${extname};base64,${imageFile.buffer.toString("base64")}`;
    const response = await cloudinary.uploader.upload(img, {
        folder: 'Ecommerce/Products'
    })

    // create product
    await pool.query(
        "INSERT INTO Product (name, price, description, stock, discount, image_url, image_public_id) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [name, price, description, stock, discount, response.secure_url, response.public_id]
    );

    // response
    res.status(201).json({
        success: true,
        message: "Product added successfully"
    });
    
});


// update product
export const updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, description, stock, discount } = req.body;

    console.log(req.body);

    if (!name || !price || !description || !stock) {
        return next(new ErrorHandler(400, "Please fill in all required fields."));
    }

    // check if product exists
    const [row] = await pool.query("SELECT * FROM Product WHERE id=?", [id]);
    if (row.length === 0) {
        return next(new ErrorHandler(404, "Product not found"));
    }

    // image file
    const imageFile = req.file;
    let imageUrl, imagePublicId;
    if (imageFile) {
        
        // insert imageFile in cloudinary 
        const extname = imageFile.originalname.split(".")[1];
        const img = `data:image/${extname};base64,${imageFile.buffer.toString("base64")}`;
        const response = await cloudinary.uploader.upload(img, {
            folder: 'Ecommerce/Products'
        })
        imageUrl = response.secure_url;
        imagePublicId = response.public_id;
        
        // delete previous image from cloudinary
        await cloudinary.uploader.destroy(row[0].image_public_id);
    } else {
        imageUrl = row[0].image_url;
        imagePublicId = row[0].image_public_id;
    }

    // update product
    await pool.query(
        "UPDATE Product SET name=?, price=?, description=?, stock=?, discount=?, image_url=?, image_public_id=? WHERE id=?", 
        [name, price, description, stock, discount, imageUrl, imagePublicId, id]
    );

    // response
    res.status(200).json({
        success: true,
        message: "Product updated successfully"
    });
});

// delete product
export const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // check if product exists
    const [row] = await pool.query("SELECT * FROM Product WHERE id=?", [id]);
    if (row.length === 0) {
        return next(new ErrorHandler(404, "Product not found"));
    }

    // delete product
    await pool.query("DELETE FROM Product WHERE id=?", [id]);

    // delete image from cloudinary
    await cloudinary.uploader.destroy(row[0].image_public_id);

    // response
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});