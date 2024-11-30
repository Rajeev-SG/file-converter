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
   - Only image files have visual previews
   - Text and PDF files show only metadata
   - No preview available for other file types

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

2. **Features**
   - Add preview support for more file types
   - Implement upload progress indicator
   - Add file type conversion preview

3. **User Interface**
   - Enhance drag and drop visual feedback
   - Improve error message presentation
   - Add more interactive loading states

## Resolution Timeline

### Short Term
- Update ESLint to supported version
- Resolve TypeScript ESLint plugin conflicts

### Long Term
- Update remaining deprecated packages
- Improve development environment setup
