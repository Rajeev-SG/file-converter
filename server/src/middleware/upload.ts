import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { AppError } from './errorHandler';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
    callback(null, 'uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  const allowedTypes = ['text/markdown', 'text/html', 'application/pdf'];
  
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new AppError('Invalid file type. Only markdown, HTML, and PDF files are allowed.', 400) as Error);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
