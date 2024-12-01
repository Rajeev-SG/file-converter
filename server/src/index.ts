import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import fileRoutes from './routes/fileRoutes';
import conversionRoutes from './routes/conversion';

// Load environment variables before any other code
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/files', fileRoutes);
app.use('/api', conversionRoutes);

// Error handling
app.use(errorHandler);

// Create uploads directory if it doesn't exist
import { mkdirSync } from 'fs';
try {
  mkdirSync('./uploads', { recursive: true });
} catch (error) {
  logger.error('Error creating uploads directory:', error);
}

// Start server with error handling
const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}).on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${port} is already in use. Please choose a different port in the .env file.`);
    process.exit(1);
  } else {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
});
