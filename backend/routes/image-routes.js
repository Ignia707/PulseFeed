// routes in regard to images

const express = require('express');
const router =  express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const { uploadImageController, 
        fetchImagesController,
        deleteImageController } = require("../controllers/image-controller");


// upload image
router.post('/upload', 
    authMiddleware, 
    uploadMiddleware.single('image'), uploadImageController);

// to get all the images
router.get('/get', authMiddleware,  fetchImagesController)

// delete image 
router.delete('/:id', 
    authMiddleware, 
    adminMiddleware, 
    deleteImageController);

module.exports = router;
