import React, { useState } from 'react';
import { Box, Select, MenuItem, Typography, Button, CircularProgress, Paper, LinearProgress } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { SupportedFormat } from '../../types/conversion';

interface FileWithPreview extends File {
  preview?: string;
  format?: string;
  previewContent?: string;
}

interface FileConversionProps {
  files: FileWithPreview[];
  onConversionComplete: (convertedFile: Blob, filename: string) => void;
}

interface QueuedFile {
  file: FileWithPreview;
  progress: number;
}

export const FileConversion: React.FC<FileConversionProps> = ({ files, onConversionComplete }) => {
  const [targetFormat, setTargetFormat] = useState<SupportedFormat>('markdown');
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>(
    files.map(file => ({ file, progress: 0 }))
  );

  const handleFormatChange = (event: SelectChangeEvent<SupportedFormat>) => {
    setTargetFormat(event.target.value as SupportedFormat);
  };

  const getSourceFormat = (filename: string): SupportedFormat => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'md':
        return 'markdown';
      case 'html':
        return 'html';
      case 'pdf':
        return 'pdf';
      default:
        throw new Error(`Unsupported file format: ${ext}`);
    }
  };

  const handleConvert = async () => {
    setError(null);

    try {
      for (const [index, queuedFile] of queuedFiles.entries()) {
        const formData = new FormData();
        formData.append('file', queuedFile.file);
        formData.append('sourceFormat', getSourceFormat(queuedFile.file.name));
        formData.append('targetFormat', targetFormat);

        const response = await fetch('http://localhost:7842/api/convert', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Conversion failed: ${response.statusText}`);
        }

        const blob = await response.blob();
        const newFilename = `${queuedFile.file.name.split('.')[0]}.${targetFormat === 'markdown' ? 'md' : targetFormat}`;
        onConversionComplete(blob, newFilename);

        setQueuedFiles(prev => 
          prev.map((item: QueuedFile, i: number) => 
            i === index ? { ...item, progress: 100 } : item
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion');
    } finally {
      setConverting(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper 
        sx={{ 
          p: 3, 
          bgcolor: 'background.paper',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1
        }}
      >
        <Typography variant="h6" gutterBottom>
          File Preview
        </Typography>

        <Box sx={{ 
          flex: 1, 
          minHeight: '300px', 
          mb: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: files.length === 0 ? 'center' : 'flex-start',
          alignItems: files.length === 0 ? 'center' : 'stretch',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: 'background.default',
          p: 3
        }}>
          {files.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              maxWidth: '400px',
              mx: 'auto'
            }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Files Selected
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                To get started:
              </Typography>
              <Box sx={{ 
                textAlign: 'left', 
                bgcolor: 'background.paper',
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="body2" component="div" color="text.secondary">
                  1. Select files using the upload area on the left<br/>
                  2. Choose your target format below<br/>
                  3. Click "Convert Files" to begin conversion
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Supported formats: Markdown (.md), HTML (.html), PDF (.pdf)
              </Typography>
            </Box>
          ) : (
            <Box sx={{ 
              flex: 1, 
              overflowY: 'auto',
              width: '100%'
            }}>
              {files.map((file, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 2,
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {file.name}
                  </Typography>
                  
                  {file.previewContent && (
                    <Paper 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        bgcolor: 'grey.50',
                        maxHeight: '200px', 
                        overflow: 'auto' 
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {file.previewContent}
                      </Typography>
                    </Paper>
                  )}

                  {queuedFiles.find(q => q.file === file)?.progress > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Converting: {queuedFiles.find(q => q.file === file)?.progress}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={queuedFiles.find(q => q.file === file)?.progress} 
                        sx={{ mt: 1 }} 
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ 
          mt: 'auto',
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="subtitle1" gutterBottom>
            Target Format:
          </Typography>
          <Select
            value={targetFormat}
            onChange={handleFormatChange}
            disabled={converting}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="html">HTML</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="markdown">Markdown</MenuItem>
          </Select>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleConvert}
            disabled={converting || files.length === 0}
            sx={{ mt: 3 }}
          >
            {converting ? (
              <>
                Converting...
                <CircularProgress size={24} sx={{ ml: 1 }} />
              </>
            ) : (
              'Convert Files'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
