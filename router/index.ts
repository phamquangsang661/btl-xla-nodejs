import upload from './upload'
import filter from './filter'
const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/upload', upload)
apiRouter.use('/filter', filter)
export default apiRouter