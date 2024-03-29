import { upload, ncpDeletePicture } from '../../config/multipart';

const uploadPicture = upload.array('MyImg', 10);
const composeImageURI = (req, res) => {
  const cdn = process.env.CDN;
  const { files } = req;
  if (files.length < 2) {
    return res.json({
      mobile: cdn + files[0].key,
      deskTop: cdn + files[0].key,
    });
  }

  const minSize = Math.min(files[0].size, files[1].size);
  const result = files.reduce((acc, file) => {
    if (file.size > minSize) {
      acc.deskTop = cdn + file.key;
    } else {
      acc.mobile = cdn + file.key;
    }
    return acc;
  }, {});
  return res.json(result);
};
const deletePicture = async (req, res, next) => {
  const { key } = req.body;
  try {
    const result = await ncpDeletePicture(key);
    return res.json(result);
  } catch (e) {
    return next({ status: 500, message: e.toString() });
  }
};

export { uploadPicture, composeImageURI, deletePicture };
