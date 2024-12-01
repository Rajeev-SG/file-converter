import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FileConversion } from '../FileConversion/FileConversion';
import * as pdfjsLib from 'pdfjs-dist';

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
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);

  const readPdfContent = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      
      return textContent.items.map((item: any) => item.str).join(' ');
    } catch (error) {
      console.error('Error reading PDF:', error);
      return 'Error reading PDF content';
    }
  };

  const readTextContent = async (file: File): Promise<string> => {
    try {
      return await file.text();
    } catch (error) {
      console.error('Error reading text:', error);
      return 'Error reading file content';
    }
  };

  const processFile = async (file: FileWithPreview) => {
    try {
      const extension = file.name.split('.').pop()?.toLowerCase();
      let previewContent = '';

      switch (extension) {
        case 'pdf':
          previewContent = await readPdfContent(file);
          file.format = 'pdf';
          break;
        case 'md':
          previewContent = await readTextContent(file);
          file.format = 'markdown';
          break;
        case 'html':
        case 'htm':
          previewContent = await readTextContent(file);
          file.format = 'html';
          break;
        default:
          previewContent = 'Preview not available';
      }

      file.previewContent = previewContent.substring(0, 200) + '...';
      return file;
    } catch (error) {
      console.error('Error processing file:', error);
      file.previewContent = 'Error generating preview';
      return file;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const processedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const fileWithPreview = file as FileWithPreview;
        return await processFile(fileWithPreview);
      })
    );
    setFiles(prev => [...prev, ...processedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
      'text/html': ['.html', '.htm'],
      'application/pdf': ['.pdf']
    }
  });

  const handleFileSelect = (file: FileWithPreview) => {
    setSelectedFiles(prev => {
      const isSelected = prev.includes(file);
      if (isSelected) {
        return prev.filter(f => f !== file);
      } else {
        return [...prev, file];
      }
    });
  };

  const handleConversionComplete = (convertedFile: Blob, filename: string) => {
    // Create download link
    const url = URL.createObjectURL(convertedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${Math.round(size)}${units[unitIndex]}`;
  };

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 3 }}>
          <Paper
            {...getRootProps()}
            sx={{
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: isDragActive ? 'action.hover' : 'background.paper',
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'divider',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop files here' : 'Drag and drop files here, or click to select files'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Supported formats: Markdown (.md), HTML (.html), PDF (.pdf)
            </Typography>
          </Paper>

          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 2 }}>
            {files.map((file, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  bgcolor: selectedFiles.includes(file) ? 'action.selected' : 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={() => handleFileSelect(file)}
              >
                <Typography variant="subtitle2" noWrap>
                  {file.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {file.format} • {formatFileSize(file.size)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    fontSize: '0.75rem',
                    height: '3em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {file.previewContent}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        {selectedFiles.length > 0 && (
          <FileConversion
            files={selectedFiles}
            onConversionComplete={handleConversionComplete}
          />
        )}
      </Grid>
    </Grid>
  );
};
