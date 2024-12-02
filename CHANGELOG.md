# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced preview container with permanent visibility and improved empty state
- Clear step-by-step instructions for file conversion workflow
- Improved file preview cards with better spacing and scrolling
- Visual hierarchy improvements with consistent borders and spacing

### Changed
- FileConversion component now always visible instead of conditionally rendered
- Improved preview container layout with fixed minimum height
- Enhanced empty state UI with better typography and visual guidance
- Reorganized conversion controls with better visual separation

### Fixed
- Preview container now properly visible on initial page load
- Empty state instructions consistently displayed when no files selected
- File preview scrolling behavior improved
- Visual consistency across all application states

## [1.2.1] - 2024-12-01

### Added
- Restored file preview functionality in conversion preview section
- Preview now shows file contents before conversion
- Added scrollable preview container with max height

## [1.2.0] - 2024-12-01

### Added
- Bidirectional conversion support between Markdown and HTML
  - Convert Markdown files to HTML format
  - Convert HTML files to Markdown format
- Progress tracking for file conversions
  - Real-time progress bar for each file
  - Percentage completion display

### Changed
- Updated file conversion UI
  - Simplified preview interface
  - Added linear progress indicators
  - Improved error message display

### Known Limitations
- PDF conversion is currently not supported
  - Cannot convert to PDF format
  - Cannot convert from PDF format
  - PDF support planned for future release

## [1.1.1] - 2024-01-XX

### Added
- File size display in preview cards
  - Human-readable format (B, KB, MB, GB)
  - Integrated with existing format display
  - Automatic unit conversion

### Technical Details
- Added formatFileSize utility function
  - Handles file sizes from bytes to gigabytes
  - Rounds to nearest whole number
  - Automatically selects appropriate unit

### Changed
- Enhanced file preview cards with size information
- Improved format and size display layout

## [1.1.0] - 2024-01-XX

### Added
- Core file conversion functionality with support for markdown, PDF, and HTML formats
- Real-time format conversion with progress tracking
- Conversion queue system for managing multiple conversion requests
- Comprehensive error handling and validation for file conversions
- Integration of key conversion libraries:
  - marked: For markdown processing
  - pdf-lib: For PDF generation and manipulation
  - jsdom: For HTML parsing and manipulation
- Front-end features:
  - Checkbox selection for files to convert
  - Format selection dropdown
  - Real-time conversion progress indicators
  - Automatic download of converted files
  - Support for multiple file conversion

### Changed
- Updated server dependencies to support new conversion features
- Enhanced error handling with custom ConversionError class
- Improved type safety with TypeScript interfaces for conversion jobs
- Integrated file conversion UI with existing upload component
- Added Material-UI components for better user experience

### Known Issues
- PDF to other format conversions not yet implemented
- HTML to markdown conversion currently provides basic text extraction only
- Complex HTML to PDF conversion needs improvement for better formatting

## [0.2.4] - 2024-01-25

### Added
- Full PDF preview functionality with text extraction
- PDF page count display
- First 128 characters preview of PDF content
- Improved error handling for PDF processing

### Changed
- Switched from pdf-lib to PDF.js for better text extraction
- Updated PDF worker initialization process
- Enhanced preview component architecture
- Improved error messaging for failed PDF processing

### Fixed
- PDF worker initialization issues
- PDF text extraction errors
- Worker loading from CDN failures
- Vite configuration for PDF.js support
- Package version conflicts

### Technical Details
- Integrated PDF.js (v3.11.174) for PDF processing
- Updated Vite configuration for proper worker handling
- Implemented direct worker initialization using import.meta.url
- Added proper error boundaries for PDF processing
- Optimized PDF text extraction process

### Known Issues
- Large PDFs may cause performance slowdown
- Some PDFs with complex layouts may have inconsistent text extraction
- Non-text PDFs (scanned documents) won't show content preview
- Memory usage may increase with multiple large PDFs

## [0.2.3] - 2024-01-25

### Added
- PDF file preview functionality:
  - Display number of pages in PDF
  - Show PDF dimensions
  - Basic PDF metadata display
  - Improved PDF preview styling

### Changed
- Enhanced file preview UI:
  - Added PDF-specific preview styles
  - Better formatting for PDF information
  - Consistent preview layout across file types
  - Improved error handling for PDF processing

### Technical Details
- Integrated pdf-lib for PDF processing
- Added PDF content extraction logic
- Enhanced error handling for PDF files
- Improved preview component architecture

### Known Limitations
- PDF text content extraction not yet implemented
- Preview limited to basic PDF metadata
- Large PDF files may cause performance issues
- No thumbnail generation for PDF pages

## [0.2.2] - 2024-01-25

### Added
- Text and PDF file content preview:
  - Display first 128 characters of text files
  - Show file information for PDF files
  - Monospace font for text content display
  - Elegant preview container with scroll handling

### Changed
- Enhanced file preview UI:
  - Added text content preview styling
  - Improved preview container layout
  - Better overflow handling for long text
  - Consistent preview sizes across file types

### Technical Details
- Added previewContent property to FileWithPreview interface
- Implemented async file content reading
- Enhanced error handling for file processing
- Added text content truncation logic

### Known Limitations
- PDF content preview shows only filename
- Text preview limited to first 128 characters
- No syntax highlighting for code files
- Some text encodings may not display correctly

## [0.2.1] - 2024-01-24

### Added
- Enhanced file preview functionality:
  - Display file name with truncation for long names
  - Show file format based on extension
  - Human-readable file size display (B, KB, MB)
  - Improved layout and visual hierarchy for file information
  - File type icon display for non-image files

### Changed
- Updated file preview UI with modern design
- Improved file information organization and readability
- Enhanced remove file button interaction
- Better handling of long file names

### Technical Details
- Added format property to FileWithPreview interface
- Improved file size formatting logic
- Enhanced CSS styling for file preview components
- Better component organization and layout structure

### Known Limitations
- Text and PDF file content preview not yet implemented
- Maximum file name display length of 20 characters
- File format detection based on extension only

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
