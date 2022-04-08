import upload from './upload'
const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/upload', upload)

export default apiRouter