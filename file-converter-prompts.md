# File Converter App Development Prompts

This guide provides a series of prompts for building a beautiful, user-friendly file conversion application using Cascade. The prompts follow a systematic approach from initial setup to feature implementation, ensuring a seamless user experience.

## 1. Project Setup and Architecture

```
I want to create a file conversion web application with the following core features:
- Drag and drop file upload
- Real-time preview window
- Multiple file concatenation
- Format conversion between markdown, PDF, and HTML
- Intuitive file management interface

Please help me:
1. Set up a modern web application structure
2. Choose appropriate open-source libraries for file conversion
3. Create a beautiful, responsive UI design
4. Implement the basic project structure with necessary dependencies
5. Set up development tooling and environment

Additionally:
6. Create a detailed README.md with:
   - Project overview
   - Installation instructions
   - Development server setup and commands
   - Contributing guidelines
7. Initialize CHANGELOG.md with initial version
8. Set up error logging infrastructure
9. Implement basic error handling patterns
10. Document ALL errors and fixes in CHANGELOG.md
11. Update BUGS.md with all issues and warnings
12. Verify all directories and files exist
13. Update README.md to reflect current project state
```

## 2. File Upload and Preview Implementation

```
For the file converter app, I need to implement the file upload and preview system.

Required features:
1. Drag and drop zone with visual feedback
2. File type validation
3. Real-time preview window
4. Multiple file upload support
5. Beautiful loading states and transitions

Please implement:
1. The drag and drop interface
2. File handling logic
3. Preview rendering system
4. Error handling and user feedback
5. Responsive layout for the upload area

Additionally:
6. Update CHANGELOG.md with new features and changes
7. Implement component-specific error logging
8. Add error boundary for upload component
9. Document any known limitations or edge cases
10. Document ALL errors and fixes in CHANGELOG.md
11. Update BUGS.md with all issues and warnings
12. Verify all directories and files exist
13. Update README.md to reflect current project state
```

## 3. File Conversion System

```
I need to implement the core file conversion functionality.

Requirements:
1. Support for markdown, PDF, and HTML formats
2. Real-time format conversion
3. Preview updates on format selection
4. Error handling for unsupported conversions
5. Conversion progress indication

Please:
1. Integrate appropriate open-source conversion libraries
2. Implement the conversion logic
3. Set up format selection dropdown
4. Create conversion queue system
5. Add error handling and validation

Additionally:
6. Update CHANGELOG.md with conversion system implementation
7. Implement comprehensive error logging for conversion processes
8. Add error recovery mechanisms for failed conversions
9. Document supported formats and conversion limitations
10. Document ALL errors and fixes in CHANGELOG.md
11. Update BUGS.md with all issues and warnings
12. Verify all directories and files exist
13. Update README.md to reflect current project state
```

## 4. File Management and Concatenation

```
I need to implement the file management and concatenation system.

Features needed:
1. File reordering interface
2. File selection/deselection
3. Concatenation preview
4. Order manipulation controls
5. Batch conversion handling

Please implement:
1. The file management interface
2. Concatenation logic
3. Order manipulation controls
4. Preview system for concatenated files
5. Batch processing system

Additionally:
6. Update CHANGELOG.md with file management features
7. Implement error handling for concatenation operations
8. Add logging for file management actions
9. Document batch processing limitations and guidelines
10. Document ALL errors and fixes in CHANGELOG.md
11. Update BUGS.md with all issues and warnings
12. Verify all directories and files exist
13. Update README.md to reflect current project state
```

## 5. UI/UX Enhancement

```
I need to enhance the user interface and experience of the file converter app.

Focus areas:
1. Beautiful, modern design
2. Smooth animations and transitions
3. Intuitive controls and feedback
4. Responsive layout
5. Accessibility features
6. Interactive user guidance system with:
   - Unobtrusive modal hints
   - Step-by-step feature introduction
   - Dismissible tooltips
   - Progress tracking
   - User preference storage for dismissed hints

Please:
1. Implement a cohesive design system
2. Add meaningful animations
3. Enhance user feedback mechanisms
4. Optimize for different screen sizes
5. Implement accessibility features
6. Create the user guidance system:
   - Design minimal, elegant hint modals
   - Implement hint trigger system
   - Add hint dismissal and persistence
   - Create hint content management system
   - Add option to reset/replay all hints

Additionally:
7. Update CHANGELOG.md with UI/UX improvements
8. Implement error handling for the hint system
9. Document the hint content and trigger conditions
10. Document ALL errors and fixes in CHANGELOG.md
11. Update BUGS.md with all issues and warnings
12. Verify all directories and files exist
13. Update README.md to reflect current project state
```

## 6. Testing and Optimization

```
I need to implement comprehensive testing and optimization for the file converter app.

Areas to cover:
1. File conversion accuracy
2. Performance optimization
3. Error handling
4. Browser compatibility
5. Load testing for large files

Please:
1. Create test cases for core functionality
2. Implement performance optimizations
3. Add comprehensive error handling
4. Test across different browsers
5. Optimize for large file handling

Additionally:
6. Update CHANGELOG.md with testing results and optimizations
7. Implement system-wide error logging and monitoring
8. Add performance benchmarking tools
9. Document known issues and workarounds
10. Document ALL errors and fixes in CHANGELOG.md
11. Update BUGS.md with all issues and warnings
12. Verify all directories and files exist
13. Update README.md to reflect current project state
```

## 7. Documentation and Deployment

```
I need to finalize the app with proper documentation and deployment setup.

Requirements:
1. User documentation
2. Code documentation
3. Deployment instructions
4. Performance monitoring
5. Maintenance guidelines

Please:
1. Create user documentation
2. Add code comments and API documentation
3. Set up deployment configuration
4. Implement monitoring
5. Create maintenance guidelines

Additionally:
6. Update CHANGELOG.md with deployment configuration
7. Implement production error logging and monitoring
8. Add system health checks and alerts
9. Document error recovery procedures
10. Create troubleshooting guides
11. Document ALL errors and fixes in CHANGELOG.md
12. Update BUGS.md with all issues and warnings
13. Verify all directories and files exist
14. Update README.md to reflect current project state
```

## How to Use These Prompts

1. Follow the prompts in sequence
2. Adapt prompts based on specific needs
3. Use the feedback from each implementation to refine subsequent steps
4. Test thoroughly after implementing each section
5. Document any modifications or additional features needed
6. Keep CHANGELOG.md updated with all changes
7. Ensure error logging is implemented for each component

## Tips for Success

1. **Implementation Strategy**
   - Start with core functionality
   - Add features incrementally
   - Test thoroughly at each step
   - Gather user feedback early
   - Monitor error logs for issues

2. **Quality Assurance**
   - Regular testing
   - Performance monitoring
   - User experience validation
   - Security considerations
   - Error tracking and analysis

3. **Maintenance**
   - Regular updates
   - Performance optimization
   - Bug fixing
   - Feature enhancement
   - Log analysis and error pattern identification

## Project Structure

```
project-root/
├── README.md           # Project documentation and setup instructions
├── CHANGELOG.md        # Detailed version history and changes
├── package.json        # Dependencies and scripts
├── src/               # Source code
├── public/            # Static assets
├── logs/              # Error and activity logs
└── docs/              # Additional documentation
```

## Development Server

The project includes a live development server with hot-reload capabilities. To start the server:

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The server will be available at `http://localhost:4269` by default.

## Error Logging

Each component and feature implementation includes:
- Component-level error boundaries
- Detailed error logging
- Error recovery mechanisms
- Performance monitoring
- User feedback systems
