const express = require('express');
const path = require('path');
const router = express.Router();
import { Resize } from '@utils';
import { uploadMiddleware } from "@middleware"
router.get('/', async function (req: any, res: any) {
    console.log("You are in index")
    await res.render('index');
});

router.post('/post', uploadMiddleware.single('image'), async function (req: any, res: any) {
    const imagePath = path.join(__dirname, '../public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({ error: 'Please provide an image' });
    }
    const { filename } = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename });
});
const upload = router
export default upload;