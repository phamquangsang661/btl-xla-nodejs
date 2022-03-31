
const express = require('express');
const app = express();
const path = require('path');
const cv = require('opencv4nodejs')
const { drawBlueRect } = require('./utils')
const router = express.Router();
const upload = require('./uploadMiddleware');
const Resize = require('./Resize');

router.get('/', async function (req, res) {
    console.log("You are in index")
    await res.render('index');
});

router.post('/post', upload.single('image'), async function (req, res) {
    const imagePath = path.join(__dirname, '/public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({ error: 'Please provide an image' });
    }
    const { filename, filepath } = await fileUpload.save(req.file.buffer);
    console.log(filename)
    const image = cv.imread(filepath);
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const { objects, numDetections } = classifier.detectMultiScale(image.bgrToGray());
    console.log('faceRects:', objects);
    console.log('confidences:', numDetections);

    if (!objects.length) {
        throw new Error('No faces detected!');
    }

    // draw detection
    const numDetectionsTh = 10;
    objects.forEach((rect, i) => {
        const thickness = numDetections[i] < numDetectionsTh ? 1 : 2;
        drawBlueRect(image, rect, { thickness });
    });
    await cv.imwriteAsync(`public/images_open/${filename}`,image).then(()=>{
        console.log("Face detect success")
    })
    return res.status(200).json({ name: filename });
});

module.exports = router;