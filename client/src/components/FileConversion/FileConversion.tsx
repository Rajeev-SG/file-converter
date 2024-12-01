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

        <Box sx={{ mt: 3 }}>
          {queuedFiles.map((queuedFile: QueuedFile, index: number) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1">
                {queuedFile.file.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={queuedFile.progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {queuedFile.progress}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
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
