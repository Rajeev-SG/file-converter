import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';

interface FileWithPreview extends File {
  preview?: string;
}

export const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setIsLoading(true);

    const newFiles = acceptedFiles.map(file => {
      // Create preview for supported file types
      if (file.type.startsWith('image/')) {
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
      }
      return file;
    });

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    setIsLoading(false);
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
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
              {file.preview && (
                <img
                  src={file.preview}
                  alt={`Preview of ${file.name}`}
                  className="preview-image"
                />
              )}
              <button
                onClick={() => removeFile(index)}
                className="remove-file"
                title="Remove file"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
