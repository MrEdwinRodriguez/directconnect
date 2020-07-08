const GoogleCloudStorage = require('@google-cloud/storage');
const { Storage }= require('@google-cloud/storage');
const path = require('path'); 
const GOOGLE_CLOUD_PROJECT_ID = 'starlit-summit-277516';
const GOOGLE_CLOUD_KEYFILE = '../config/starlit-summit-277516-2b89f0a902a8.json'; // Replace with the path to the downloaded private key

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS ? path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS) :  path.join(__dirname, GOOGLE_CLOUD_KEYFILE),
});
// const storage = new Storage({KeyFilename: GOOGLE_CLOUD_KEYFILE, projectId: GOOGLE_CLOUD_PROJECT_ID});
// const storage = new Storage({GOOGLE_CLOUD_KEYFILE, GOOGLE_CLOUD_PROJECT_ID});

exports.storage = storage;



exports.getPublicUrl = (bucketName, fileName) => `https://storage.cloud.google.com/${bucketName}/${fileName}`;



