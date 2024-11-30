import express from 'express';
import { upload } from '../middleware/upload';
import {
  uploadFile,
  convertFile,
  previewFile,
  concatenateFiles,
} from '../controllers/fileController';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.post('/convert', upload.single('file'), convertFile);
router.get('/preview/:filename', previewFile);
router.post('/concatenate', upload.array('files', 10), concatenateFiles);

export default router;
