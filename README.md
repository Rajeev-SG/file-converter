# File Converter Web Application

A modern, intuitive web application for converting files between various formats with real-time preview capabilities.

## Current Status

**Project Status**: Active Development (v0.2.0)
- Basic project structure established
- Development environment configured
- Core dependencies installed
- File upload system implemented
- Error handling system in place

## Features (Implemented)

### File Upload System
- Drag and drop file upload with visual feedback
- Multiple file upload support
- File type validation (.txt, .md, .pdf, images)
- Real-time preview for image files
- Maximum file size: 10MB per file
- Beautiful loading states and transitions

### Error Handling
- Comprehensive error boundary implementation
- User-friendly error messages
- Graceful error recovery
- Development mode detailed error information

### User Interface
- Modern, responsive design
- Intuitive drag and drop interface
- Real-time upload feedback
- Clean, minimalist layout
- Smooth animations and transitions

## Features (Planned)

- File format conversion
- Preview support for more file types
- Progress indicator for large files
- File compression options
- Batch processing capabilities

## Tech Stack

### Frontend
- React with TypeScript
- Vite (dev server on port 4269)
- React Query for state management
- React Dropzone for file uploads
- Axios for HTTP requests

### Backend
- Node.js with Express (running on port 7842)
- TypeScript
- Winston for logging
- Multer for file handling

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Known Issues

- Some ESLint-related packages are deprecated and will be updated soon
- TypeScript ESLint plugin has peer dependency conflicts (currently using --legacy-peer-deps as workaround)
- Preview only available for image files
- Maximum file size: 10MB per file
- Supported formats: .txt, .md, .pdf, and common image formats
- See [BUGS.md](BUGS.md) for full list of known issues

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/file-converter.git
   cd file-converter
   ```

2. Install dependencies:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
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

3. Start the development servers:
   ```bash
   # Start client (from client directory)
   npm run dev

   # Start server (from server directory)
   npm run dev
   ```

## Project Structure

```
file-converter/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── ErrorBoundary.css
│   │   │   └── FileUpload/
│   │   │       ├── FileUpload.tsx
│   │   │       └── FileUpload.css
│   │   ├── App.tsx
│   │   └── App.css
│   └── ...
├── server/
│   └── ...
├── CHANGELOG.md
├── BUGS.md
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

- [CHANGELOG.md](CHANGELOG.md) - Detailed version history and changes
- [BUGS.md](BUGS.md) - Known issues and technical debt

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
