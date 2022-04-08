const multer = require('multer');


export const uploadMiddleware = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});