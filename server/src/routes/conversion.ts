import express from 'express';
import multer from 'multer';
import { promises as fs } from 'fs';
import { ConversionService } from '../services/ConversionService';
import { ConversionError } from '../errors/ConversionError';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const conversionService = new ConversionService();

router.post('/convert', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new ConversionError('No file provided');
    }

    const { sourceFormat, targetFormat } = req.body;
    if (!sourceFormat || !targetFormat) {
      throw new ConversionError('Source and target formats are required');
    }

    const fileContent = await fs.readFile(req.file.path, 'utf-8');
    const convertedContent = await conversionService.convertContent(
      fileContent,
      sourceFormat,
      targetFormat
    );

    // Clean up uploaded file
    await fs.unlink(req.file.path);

    res.send(convertedContent);
  } catch (error) {
    if (req.file) {
      // Clean up uploaded file on error
      await fs.unlink(req.file.path).catch(() => {});
    }
    
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Conversion failed'
    });
  }
});

router.get('/formats', (req, res) => {
  res.json(conversionService.getSupportedFormats());
});

export default router;
