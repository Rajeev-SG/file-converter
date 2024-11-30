# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-01-24

### Added
- Implemented drag and drop file upload system with the following features:
  - Visual feedback during drag and drop
  - File type validation (.txt, .md, .pdf, images)
  - Real-time file preview for images
  - Multiple file upload support
  - Beautiful loading states and transitions
- Added ErrorBoundary component for graceful error handling
- Implemented responsive design for all screen sizes
- Added file size validation (max 10MB per file)
- Created modern UI with smooth animations and transitions

### Changed
- Updated App component to focus on file converter functionality
- Improved overall application styling with modern design
- Enhanced error handling and user feedback
- Restructured project to use component-based architecture

### Technical Details
- Created new components:
  - FileUpload: Handles file upload and preview functionality
  - ErrorBoundary: Provides graceful error handling
- Added comprehensive error logging
- Implemented proper cleanup for file previews
- Added responsive design breakpoints

### Known Limitations
- Preview only available for image files
- Maximum file size limited to 10MB
- Supported formats: .txt, .md, .pdf, and common image formats

## [0.1.2] - 2024-01-24

### Fixed
- Resolved Vite command not found error by updating package.json scripts to use local node_modules binaries
- Fixed dependency conflicts by installing with --legacy-peer-deps
- Removed problematic global Vite linking approach
- Updated frontend dependencies to compatible versions

### Changed
- Modified package.json scripts to use explicit paths to node_modules binaries
- Updated client dependencies to resolve version conflicts
- Removed postinstall script that required elevated permissions

## [0.1.1] - 2024-01-24

### Fixed
- Resolved TypeScript configuration error in `tsconfig.node.json` by adding `"incremental": true` option
- Fixed missing `fileController.ts` module error by implementing the controller with placeholder functions
- Resolved port conflict issues by:
  - Changing default backend port from 3001 to 7842
  - Adding better error handling for port conflicts in server startup
  - Ensuring proper loading of environment variables
- Updated frontend port from 5173 to 4269 to avoid conflicts with existing services

### Added
- Created uploads directory with `.gitkeep` for file storage
- Added `.gitignore` rules for uploaded files and logs
- Implemented basic error handling middleware
- Added Winston logger configuration
- Created placeholder implementations for file operations:
  - File upload
  - File conversion
  - File preview
  - File concatenation
- Added development environment configuration with `.env` file

### Changed
- Updated server initialization to include proper error handling for port conflicts
- Modified Vite configuration to include API proxy settings
- Updated documentation to reflect correct port numbers and setup instructions

## [0.1.0] - 2024-01-24

### Added
- Initial project setup
- Basic project structure (client/server)
- Project documentation (README.md, CHANGELOG.md)
- Development environment configuration
- Basic error handling infrastructure

### Development
- Created project directory structure
- Initialized npm project
- Set up documentation framework
