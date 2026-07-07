

const multer = require('multer');
const path =  require('path');
const fs = require('fs');


const uploadDir = path.join(__dirname, "../uploads");

// set multer storage
const storage = multer.diskStorage({
    destination : function(req, file,cb) {

        if (!fs.existsSync("uploads/")) {
           fs.mkdirSync(uploadDir, { recursive : true });
        }

        cb(null, uploadDir);
    },
    filename : function(req, file, cb) {
        cb(
            null, 
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
});


// file filter function 
const checkFileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an image! Please upload only images'));
    }
}


// multer middle ware
module.exports = multer({
    storage : storage,
    fileFilter : checkFileFilter,
    limits : {
        fileSize : 5 * 1024 * 1024 // 5 MB 
    },
});