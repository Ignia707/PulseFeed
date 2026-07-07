// controllers to operate on images 

const fs = require('fs');

const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');
const { uploadedToCloudinary } = require('../helpers/cloudinaryHelper');

const uploadImageController = async(req, res) => {
    try {
        // check if file is missing in req object
        if(!req.file) {
            return res.status(400).json({
                success : false,
                message : 'File is required. Please upload an image'
            });
        }

        // upload to cloudinary
        const { url, publicId } = await uploadedToCloudinary(req.file.path);

        // store the image url and public id - along with user id in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        });

        // save the uploaded image to database and send response
        await newlyUploadedImage.save();

        // delete the file from local storage
        // fs.unlinkSync(req.file.path);

        res.status(201).json({
            success : true,
            message : 'Image uploaded successfully',
            image : newlyUploadedImage
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! Please try again.'
        });
    }
}

const fetchImagesController = async(req, res) => {
    try {
        // Pagination and Sorting
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page - 1) * limit; // skip the initial images to display next set of images 
 
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
        if(images) {
            res.status(200).json({
                success : true,
                currentPage : page,
                totalPages : totalPages,
                totalImages : totalImages,
                data : images
            });
        }

    } catch(err) {
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! Please try again'
        });
        
    }
}

const deleteImageController = async(req, res) => {
    try {
        // getting imageId of image
        // getting userId of user trying to delete it
        const getCurrentImageId = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentImageId);
        if(!image) {
            return res.status(404).json({
                success : false,
                message : 'Image not found'
            });
        }

        // check if image is uploaded by the current user
        if(image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success : false,
                message : 'You are not authorized to delete this image'
            });
        }

        // delete the image from cloudinary 
        await cloudinary.uploader.destroy(image.publicId);

        // delete the image from database
        await Image.findByIdAndDelete(getCurrentImageId);

        res.status(200).json({
            success : true,
            message : 'Image deleted successfully'
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! Please try again'
        });
        
    }
}

module.exports = {
    uploadImageController,
    fetchImagesController,
    deleteImageController
};