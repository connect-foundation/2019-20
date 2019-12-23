import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './awsConfig';

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.bucket,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    cacheControl: 'max-age=31536000',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const ncpDeletePicture = async (fileName) => {
  await s3
    .deleteObject({
      Bucket: process.env.bucket,
      Key: fileName,
    })
    .promise();
};

export { upload, ncpDeletePicture };
