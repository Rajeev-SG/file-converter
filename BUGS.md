# Known Issues and Technical Debt

This document tracks known issues and deprecated packages in the current boilerplate setup.

## Deprecated Packages

### Client Dependencies
1. **ESLint** (v8.57.1)
   - Status: Deprecated
   - Issue: This version is no longer supported
   - Fix: Update to latest version as per [ESLint version support](https://eslint.org/version-support)
   - Priority: Medium

2. **@humanwhocodes/config-array** (v0.13.0)
   - Status: Deprecated
   - Issue: Package is outdated
   - Fix: Replace with @eslint/config-array
   - Priority: Low

3. **@humanwhocodes/object-schema** (v2.0.3)
   - Status: Deprecated
   - Issue: Package is outdated
   - Fix: Replace with @eslint/object-schema
   - Priority: Low

## Dependency Conflicts

1. **TypeScript ESLint Plugin**
   - Issue: Peer dependency conflicts between @typescript-eslint/eslint-plugin and its parser
   - Current Workaround: Using --legacy-peer-deps
   - Proper Fix Needed: Align versions of @typescript-eslint/eslint-plugin and @typescript-eslint/parser
   - Priority: High

## Development Environment

1. **Vite Global Installation**
   - Issue: Permission issues with global package linking
   - Current Workaround: Using local node_modules binaries
   - Future Consideration: Better development environment setup
   - Priority: Low

## File Upload System Issues

### Known Limitations
1. **File Preview**
   - Text files show only first 128 characters
   - PDF preview limited to metadata (pages, dimensions)
   - No PDF text content extraction
   - No PDF page thumbnails
   - Large PDFs may cause performance issues
   - Preview container size fixed, may truncate content

2. **File Size**
   - Maximum file size limited to 10MB
   - No progress indicator for large file uploads
   - Potential memory issues with multiple large files

3. **Browser Compatibility**
   - File preview may not work in older browsers
   - Drag and drop functionality requires modern browser support
   - CSS animations may not work in all browsers

### Potential Issues
1. **Memory Management**
   - Large files may cause performance issues
   - Multiple file previews could impact browser performance
   - Memory leaks possible if component unmounts during upload

2. **Error Handling**
   - Network errors during upload need better handling
   - Some error messages may not be user-friendly
   - Error boundary may not catch all edge cases

3. **User Experience**
   - Loading states could be more informative
   - Drag and drop zone could be more intuitive
   - File type validation messages could be clearer

### Future Improvements
1. **Performance**
   - Implement file chunking for large uploads
   - Add compression for image previews
   - Optimize memory usage for multiple files
   - Add PDF text content extraction
   - Implement PDF page thumbnails
   - Add PDF content caching

2. **Features**
   - Add full PDF text content preview
   - Implement PDF page navigation
   - Add PDF thumbnail generation
   - Support PDF text search
   - Add PDF zoom functionality
   - Implement text encoding detection
   - Add code syntax highlighting
   - Support more text-based file formats
   - Add preview zoom functionality

3. **User Interface**
   - Enhance drag and drop visual feedback
   - Improve error message presentation
   - Add more interactive loading states

## File Preview System

### Known Issues
1. **PDF Preview**
   - Large PDFs (>10MB) may cause performance issues
   - Complex PDF layouts may result in inconsistent text extraction
   - Scanned PDFs without OCR won't show text content
   - Memory usage increases with multiple PDF previews
   - Some PDF fonts may not render correctly in preview
   - PDF preview limited to first 128 characters

2. **Text Files**
   - Text files show only first 128 characters
   - Some text encodings may not display correctly
   - No syntax highlighting for code files
   - Preview container size fixed, may truncate content

3. **Performance**
   - Multiple large files may cause UI lag
   - PDF processing can be CPU intensive
   - Memory leaks possible with many PDF previews
   - Worker initialization may fail in poor network conditions

### Development Warnings
1. **Package Dependencies**
   - Deprecated package warnings for:
     * are-we-there-yet@2.0.0
     * npmlog@5.0.1
     * gauge@3.0.2
   - High severity vulnerability reported (needs audit)

2. **Build Process**
   - Vite postinstall script requires sudo permissions
   - PDF.js worker path resolution sensitive to build configuration
   - Development server may need restart after PDF.js changes

### Future Improvements
1. **PDF Handling**
   - Implement PDF text content caching
   - Add full PDF content preview
   - Support PDF page navigation
   - Add PDF thumbnail generation
   - Implement text search within PDFs
   - Add zoom functionality
   - Optimize memory usage for large PDFs
   - Add progress indicator for PDF processing

2. **Performance Optimization**
   - Implement lazy loading for PDF preview
   - Add file size checks before processing
   - Implement worker pool for PDF processing
   - Add compression for preview content
   - Optimize memory usage for multiple files

3. **User Experience**
   - Add loading indicators for PDF processing
   - Improve error messages for failed previews
   - Add retry mechanism for failed worker initialization
   - Implement preview size controls
   - Add file type icons for better visualization

## Resolution Timeline

### Short Term
- Update ESLint to supported version
- Resolve TypeScript ESLint plugin conflicts

### Long Term
- Update remaining deprecated packages
- Improve development environment setup
