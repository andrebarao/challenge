const express = require('express');
const router = express.Router();

const { authenticateUser, uploadFile, updateFile, deleteFile } = require('../controllers/controllers');

router.post('/login', authenticateUser);
router.post('/upload', uploadFile);
router.post('/updateFile', updateFile);
router.post('/deleteFile', deleteFile);

module.exports = router;