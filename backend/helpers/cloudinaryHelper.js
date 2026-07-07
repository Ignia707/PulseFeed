// helpers that handle actions with cloudinary

const cloudinary =  require('../config/cloudinary');

const uploadedToCloudinary = async(filepath) => {
    try {
        
        const result = await cloudinary.uploader.upload(filepath);
        
        return {
            url : result.secure_url,
            publicId : result.public_id
        }

    } catch (err) {
        console.error('Error while uploading to cloudinary', err);
        throw new Error('Error while uploading to cloudinary');
        
    }
}

module.exports = {
    uploadedToCloudinary
};