	
  const gcsHelpers = require('../helpers/google-cloud-storage');
  
  const storage = gcsHelpers.storage;
  const DEFAULT_BUCKET_NAME = 'direct_connect'; // Replace with the name of your bucket
  const {Storage} = require('@google-cloud/storage');
  
  exports.sendUploadToGCS = (req, res, next) => {
    // const fileUploaded = req.files.file;
    req.file = req.files.file;
    if (!req.file) {
      return next();
    }
    console.log('file uploaded: ', req.file)
    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req.file.name}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
      resumable: false,
      metadata: {
          contentType: req.file.mimetype,
        },
    });
    
    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
        next(err)
    });
    stream.on('finish', () => {
        console.log('image uploaded succesfully')
        req.file.cloudStorageObject = gcsFileName;
      return file.makePublic()
        .then(() => {
          req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
          next()
        });
    });
    console.log('here', req.files.file.buffer)
    stream.end(req.file.data);
  };
