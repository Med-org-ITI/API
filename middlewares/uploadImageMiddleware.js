const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const ApiError = require('../utils/apiError');

const multerOptions = () =>{
    const multerStorage = multer.memoryStorage();
    // const multerStorage = multer.diskStorage({
    //     destination: function(req, file, cb){
    //         cb(null, 'uploads/users');
    //     },
    //     filename: function(req, file, cb){
    //         const extension = file.mimetype.split("/")[1]; //mimetype --> 'image/jpeg'
    //         // uuid --> generate unique id
    //         const filename = `user-${uuidv4()}-${Date.now()}.${extension}` // user-${id}-Date.now().jpeg
    //         cb(null, filename); //null --> means that not found error
    
    //         // Save image (as imageName) into our database
    //         req.body.profileImage = filename;
    //     }
    // });
    
    const multerFilter = function(req, file, cb){
            if(file.mimetype.startsWith('image')){
                cb(null, true);
            } else{
                cb(new ApiError("Only Images allowed", 400), false); // false if exist error (failed)
            }
      
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter});
    return upload;
};

exports.uploadSingleImage = (image) => multerOptions().single(image);

