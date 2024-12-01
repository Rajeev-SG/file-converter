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
      <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          Conversion Preview
        </Typography>

        {queuedFiles.map((queuedFile, index) => (
          <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              {queuedFile.file.name}
            </Typography>
            
            {queuedFile.file.previewContent && (
              <Paper sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5', maxHeight: '200px', overflow: 'auto' }}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {queuedFile.file.previewContent}
                </Typography>
              </Paper>
            )}

            {queuedFile.progress > 0 && (
              <LinearProgress variant="determinate" value={queuedFile.progress} sx={{ mt: 1 }} />
            )}
          </Box>
        ))}

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Target Format:
          </Typography>
          <Select
            value={targetFormat}
            onChange={handleFormatChange}
            disabled={converting}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="html">HTML</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="markdown">Markdown</MenuItem>
          </Select>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleConvert}
          disabled={converting || queuedFiles.length === 0}
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
      </Paper>
    </Box>
  );
};
