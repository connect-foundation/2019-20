import express from 'express';
import {
  uploadPicture,
  composeImageURI,
  deletePicture,
} from './controller/imageControl';

const router = express.Router();

router
  .route('/')
  .post(uploadPicture, composeImageURI)
  .delete(deletePicture);

export default router;
