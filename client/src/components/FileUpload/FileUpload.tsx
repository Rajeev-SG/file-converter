import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import './FileUpload.css';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

interface FileWithPreview extends File {
  preview?: string;
  format?: string;
  previewContent?: string;
}

export const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const readPdfContent = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument(arrayBuffer);
      const pdf = await loadingTask.promise;
      
      if (pdf.numPages === 0) {
        return 'PDF document is empty';
      }

      // Get text from first page
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      const text = textContent.items
        .map((item: any) => item.str)
        .join(' ')
        .slice(0, 128);

      return `PDF Document - ${pdf.numPages} page(s)\n${text}...`;
    } catch (err) {
      console.error('Error reading PDF:', err);
      return 'Error reading PDF content';
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setIsLoading(true);

    const processFiles = acceptedFiles.map(async file => {
      const format = file.name.split('.').pop()?.toUpperCase() || 'Unknown';
      
      // Handle text files
      if (file.type === 'text/plain' || file.type === 'text/markdown') {
        try {
          const text = await file.text();
          return Object.assign(file, {
            format,
            previewContent: text.slice(0, 128)
          });
        } catch (err) {
          console.error('Error reading file:', err);
          return Object.assign(file, {
            format,
            previewContent: 'Error reading file content'
          });
        }
      }
      
      // Handle images
      if (file.type.startsWith('image/')) {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          format
        });
      }
      
      // Handle PDFs
      if (file.type === 'application/pdf') {
        try {
          const pdfContent = await readPdfContent(file);
          return Object.assign(file, {
            format,
            previewContent: pdfContent
          });
        } catch (err) {
          console.error('Error processing PDF:', err);
          return Object.assign(file, {
            format,
            previewContent: 'Error processing PDF file'
          });
        }
      }
      
      return Object.assign(file, { format });
    });

    Promise.all(processFiles)
      .then(newFiles => {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error processing files:', err);
        setError('An error occurred while processing the files.');
        setIsLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxSize: 10485760, // 10MB
    onError: (err) => {
      console.error('Dropzone error:', err);
      setError('An error occurred while uploading the file.');
    },
    onDropRejected: (fileRejections) => {
      const errors = fileRejections.map(rejection => {
        if (rejection.errors[0].code === 'file-too-large') {
          return 'File is too large. Maximum size is 10MB.';
        }
        if (rejection.errors[0].code === 'file-invalid-type') {
          return 'Invalid file type. Please upload supported file formats.';
        }
        return rejection.errors[0].message;
      });
      setError(errors.join(' '));
    }
  });

  const removeFile = (index: number) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  React.useEffect(() => {
    // Cleanup previews on unmount
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  return (
    <div className="file-upload-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${error ? 'error' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="dropzone-content">
          {isLoading ? (
            <div className="loading-spinner" />
          ) : isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <div>
              <p>Drag & drop files here, or click to select files</p>
              <p className="supported-formats">
                Supported formats: .txt, .md, .pdf, images
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="preview-container">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="file-preview">
              <div className="file-info">
                <div className="file-header">
                  <span className="file-name" title={file.name}>
                    {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="remove-file"
                    title="Remove file"
                  >
                    ×
                  </button>
                </div>
                <div className="file-details">
                  <span className="file-format">{file.format}</span>
                  <span className="file-size">
                    {file.size < 1024
                      ? `${file.size} B`
                      : file.size < 1024 * 1024
                      ? `${(file.size / 1024).toFixed(1)} KB`
                      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                  </span>
                </div>
              </div>
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={`Preview of ${file.name}`}
                  className="preview-image"
                />
              ) : (
                <div className="file-type-icon">
                  <div className="preview-header">{file.format}</div>
                  <div className={`preview-content ${file.type === 'application/pdf' ? 'pdf-preview' : ''}`}>
                    {file.type === 'application/pdf' ? (
                      <>
                        <div className="pdf-info">
                          {file.previewContent?.split('\n')[0]}
                        </div>
                        <div className="pdf-text">
                          {file.previewContent?.split('\n').slice(1).join('\n')}
                        </div>
                      </>
                    ) : (
                      file.previewContent || file.format
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
