require('dotenv').config()

const fs = require('fs')
const AWS = require('aws-sdk');
//const { User } = require('../models/user');
const { File } = require('../models/user');
//const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
};

const { awsConfig } = require('../config/config');

AWS.config.update(awsConfig);
const s3 = new AWS.S3();

// Updated using async/await
async function uploadFile(req, res) {
  const { filePath, description, fileName, userId } = req.body;  //Get these parameters from the request's body
  try {
    const params = {
      Bucket: process.env.bucketName, // Replace with your bucket name
      Key: fileName, // Specify your file name
      Body: fs.readFileSync(filePath), // Specify the path to your file
    };
   
    const data = await s3.putObject(params).promise();
    await File.create({
      filename: fileName,
      description: description,
      userId: userId,
    });
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function updateFile(req, res) {
  try {
    const {fileName, description} = req.body; 
    const params = {
        Bucket: process.env.bucketName, // Replace with your bucket name
        Key: fileName, // Specify your file name
    };

    // Find the file by filename
    const file = await File.findOne({ where: { filename: fileName } });

    if (!file) return res.status(404).json({ message: 'File not found' });

    // Update the file description
    file.description = description;
    await file.save();

    res.status(200).json({ message: 'File updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteFile(req, res) {
  try {
    const {fileName} = req.body; 
    const params = {
        Bucket: process.env.bucketName, // Replace with your bucket name
        Key: fileName, // Specify your file name
      };

    const data = await s3.deleteObject(params).promise();
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  authenticateUser,
  uploadFile,
  updateFile,
  deleteFile,
};