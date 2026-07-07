// Image model 

const mongoose = require('mongoose');

const ImageSchema =  new mongoose.Schema({
    url : {
        type : String,
        requird : true
    },
    publicId : {
            type : String,
            required : true
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        requird : true

    }
}, { timestamps : true });


module.exports = mongoose.model('Image', ImageSchema);
