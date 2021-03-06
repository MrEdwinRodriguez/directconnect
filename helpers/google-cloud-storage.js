const GoogleCloudStorage = require('@google-cloud/storage');
const { Storage }= require('@google-cloud/storage');
const path = require('path'); 
const GOOGLE_CLOUD_PROJECT_ID = 'starlit-summit-277516';
const GOOGLE_CLOUD_KEYFILE = '../config/starlit-summit-277516-2b89f0a902a8.json'; 

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS ? process.env.GOOGLE_APPLICATION_CREDENTIALS :  path.join(__dirname, GOOGLE_CLOUD_KEYFILE),
});

exports.storage = storage;



exports.getPublicUrl = (bucketName, fileName) => `http://storage.googleapis.com/${bucketName}/${fileName}`;
