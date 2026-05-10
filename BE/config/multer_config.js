const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../FE/public/pictures'));
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, name) => {
            const fn = name.toString('hex') + "_" + path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname);
            cb(null, fn);
        })
    }
})

const upload = multer({ storage: storage });

module.exports = upload;