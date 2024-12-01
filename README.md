# File Converter

A modern web application for file preview and conversion, built with React and Node.js.

## Features

### File Upload
- Drag and drop file upload
- Multiple file selection
- File preview generation
- File size display with automatic unit conversion
- Supported formats:
  * Markdown (.md)
  * HTML (.html)
  * PDF (.pdf) - Preview only

### File Preview
- Format-specific preview
- File metadata display:
  * Format type
  * File size (B to GB)
  * Preview content

- **PDF Files**
  - Page count display
  - Text content preview (first 128 characters)
  - Supports text-based PDFs
  - Fast preview generation

- **Text Files**
  - Content preview (first 128 characters)
  - Supports various encodings
  - Clean, formatted display

### File Conversion Features

#### Supported Conversions
- Markdown to HTML
- HTML to Markdown
- PDF support coming soon

#### Conversion Features
- Real-time progress tracking
- Batch file conversion
- Error handling and reporting
- Preview before conversion
- Automatic format detection

## Technology Stack

### Frontend
- React 18.2
- TypeScript
- Vite
- PDF.js 3.11.174
- React Dropzone
- React Query
- Material-UI (MUI)

### Backend
- Node.js
- Express
- Multer (file upload handling)
- Sharp (image processing)
- Markdown-it (markdown processing)

## Project Structure

The application follows a client-server architecture with React on the frontend and Node.js on the backend.

### Client Architecture (`/client`)

#### Core Components

##### FileUpload Component
- **Location**: `/client/src/components/FileUpload/`
- **Files**:
  * `FileUpload.tsx`
  * `FileUpload.css`
- **Responsibilities**:
  * File selection and drag-drop handling
  * Initial file validation
  * Preview generation for multiple file types
  * File metadata extraction
- **Dependencies**:
  * External: react-dropzone, pdfjs-dist, Material-UI
  * Internal: conversion types
- **State Management**: Local component state for:
  * Selected files
  * Preview content
  * Upload status

##### FileConversion Component
- **Location**: `/client/src/components/FileConversion/`
- **Files**:
  * `FileConversion.tsx`
- **Responsibilities**:
  * Conversion queue management
  * Format selection interface
  * Progress tracking
  * Preview display
  * Error state handling
- **Dependencies**:
  * External: Material-UI
  * Internal: conversion types
- **State Management**: Local state for:
  * Conversion queue
  * Progress tracking
  * Format selection

##### ErrorBoundary Component
- **Location**: `/client/src/components/ErrorBoundary/`
- **Files**:
  * `ErrorBoundary.tsx`
  * `ErrorBoundary.css`
- **Responsibilities**:
  * Global error catching
  * Error UI rendering
  * Error logging
- **Dependencies**:
  * External: Material-UI
- **State Management**: Local error state for:
  * Error information
  * Recovery options

#### Client Directory Structure
- `/src`
  * `App.tsx` - Main application component
  * `main.tsx` - Application entry point
  * `App.css` - Global styles
  * `/components` - React components
  * `/assets` - Static assets
  * `/types` - TypeScript type definitions
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

### Server Architecture (`/server`)

#### Core Components

##### API Routes (`/src/routes`)
- **Files**:
  * `fileRoutes.ts` - File upload endpoints
  * `conversion.ts` - Conversion endpoints
- **Responsibilities**:
  * Route handling for file operations
  * Conversion request processing
  * Response formatting

##### Controllers (`/src/controllers`)
- **Files**:
  * `fileController.ts` - File operation handlers
- **Responsibilities**:
  * File upload handling
  * Conversion process management
  * Error handling

##### Services (`/src/services`)
- **Files**:
  * `ConversionService.ts` - Core conversion logic
- **Responsibilities**:
  * File format conversion
  * Progress tracking
  * Temporary file management

##### Middleware (`/src/middleware`)
- **Files**:
  * `errorHandler.ts` - Global error handling
  * `upload.ts` - File upload middleware
- **Responsibilities**:
  * Request validation
  * Error processing
  * File upload processing

#### Server Directory Structure
- `/src`
  * `index.ts` - Server entry point
  * `/routes` - API route definitions
  * `/controllers` - Request handlers
  * `/services` - Business logic
  * `/middleware` - Express middleware
  * `/errors` - Custom error definitions
  * `/utils` - Utility functions
- `/uploads` - Temporary file storage
- `/logs` - Application logs
- `.env` - Environment configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

### Configuration Files
- `.gitignore` - Git ignore rules
- `.env.example` - Environment variables template

## Implementation Details

### File Upload Flow
1. Client-side validation and file preview generation
2. Secure file upload to server's temporary storage
3. Server-side format validation
4. Preview generation and metadata extraction

### Conversion Process
1. File format detection and validation
2. Conversion service selection based on file type:
   - Markdown to HTML using marked
   - HTML to Markdown using custom DOM parsing
   - PDF processing using pdf-lib
3. Progress tracking through server events
4. Queue management for multiple conversions
5. Error handling and cleanup

### Error Handling
- Client-side validation with user feedback
- Server-side error middleware for consistent error responses
- Automatic cleanup of temporary files
- Detailed error logging

## Setup

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd file-converter
```

2. Install dependencies:

For the client:
```bash
cd client
npm install --ignore-scripts
```

For the server:
```bash
cd server
npm install
```

3. Set up environment variables:
```bash
# In the server directory
cp .env.example .env
```

Required environment variables:
```
PORT=7842
NODE_ENV=development
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

### Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm run dev
```

3. Open http://localhost:5173 in your browser

## Known Limitations

### PDF Support
- Currently limited to preview only
- Conversion to/from PDF not yet supported
- Complex layouts may affect text extraction

### Text Files
- Preview limited to first 128 characters
- Fixed preview container size

For a complete list of known issues and limitations, see [BUGS.md](BUGS.md).

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and updates.
