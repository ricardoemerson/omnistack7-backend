const multer = require('multer');
const path = require('path');

module.exports = {
    // Set the destination of uploaded file and the default name.
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    })
}
