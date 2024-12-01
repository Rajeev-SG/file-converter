# File Converter

A modern web application for file preview and conversion, built with React and Node.js.

## Features

### File Preview
- **Image Files**
  - Visual preview with thumbnail generation
  - Supports common formats (PNG, JPG, GIF, etc.)
  - Responsive image scaling

- **PDF Files**
  - Page count display
  - Text content preview (first 128 characters)
  - Supports text-based PDFs
  - Fast preview generation

- **Text Files**
  - Content preview (first 128 characters)
  - Supports various encodings
  - Clean, formatted display

### File Management
- Drag and drop file upload
- Multiple file selection
- File type detection
- Progress tracking
- Error handling

## Technology Stack

### Frontend
- React 18.2
- TypeScript
- Vite
- PDF.js 3.11.174
- React Dropzone
- React Query

### Backend
- Node.js
- Express
- Multer
- Sharp

## Setup

### Prerequisites
- Node.js 16+
- npm 8+

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

3. Start the development servers:

For the client:
```bash
cd client
npm run dev
```

For the server:
```bash
cd server
npm run dev
```

## Known Limitations

### PDF Preview
- Limited to first 128 characters of text content
- May have performance issues with large PDFs
- Scanned PDFs without OCR won't show text preview
- Complex layouts may affect text extraction

### Text Files
- Preview limited to first 128 characters
- No syntax highlighting
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
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── CHANGELOG.md
├── BUGS.md
└── README.md
```

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
   npm install --ignore-scripts

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

4. Start the development servers:
   ```bash
   # Start client (from client directory)
   npm run dev

   # Start server (from server directory)
   npm run dev
   ```
