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

```
file-converter/
├── client/                    # Frontend React application
│   ├── src/                  # Source code directory
│   │   ├── components/       # React components
│   │   ├── assets/          # Static assets
│   │   ├── types/           # TypeScript type definitions
│   │   └── App.tsx          # Root component
│   ├── public/              # Public static files
│   ├── node_modules/        # Client dependencies
│   ├── index.html          # Entry HTML file
│   ├── tsconfig.json       # TypeScript configuration
│   ├── vite.config.ts      # Vite configuration
│   └── package.json        # Frontend dependencies
├── server/                   # Backend Node.js application
│   ├── src/                 # Source code directory
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── errors/         # Error handling
│   ├── uploads/            # Temporary file storage
│   ├── logs/              # Application logs
│   ├── node_modules/      # Server dependencies
│   ├── .env              # Environment variables
│   ├── .env.example      # Environment template
│   └── package.json      # Backend dependencies
├── prompts/               # Development prompts
├── CHANGELOG.md          # Version history
├── BUGS.md              # Known issues
├── README.md            # Project documentation
└── package.json         # Root package.json
```

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
