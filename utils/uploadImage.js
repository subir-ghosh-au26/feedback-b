const cloudinary = require('../config/cloudinary');

     const uploadImage = (file) => {
        return new Promise((resolve, reject) => {
             cloudinary.uploader.upload(
             file.path,
             {
               folder: "classroom-feedback-images",
                use_filename: true,
             },
            (err, res) => {
               if (err) {
                   reject(err);
                }
                resolve(res);
            }
          )
       });
     };
    module.exports = uploadImage;