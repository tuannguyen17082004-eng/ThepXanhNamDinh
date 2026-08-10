const cloudinary = require("../config/cloudinary_config");
const streamifier = require('streamifier');

module.exports.uploadImageFile = async (buffer, folder) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            streamifier.createReadStream(buffer).pipe(stream);
        });
    
    return result;

    } catch (err) {
        console.error(err);
    }
}

module.exports.uploadVideoFile = async (buffer, folder) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder, resource_type: "video" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            streamifier.createReadStream(buffer).pipe(stream);
        });
    
    return result;

    } catch (err) {
        console.error(err);
    }

}

