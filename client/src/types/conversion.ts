export type SupportedFormat = 'markdown' | 'pdf' | 'html';

export interface ConversionJob {
  id: string;
  sourceFormat: SupportedFormat;
  targetFormat: SupportedFormat;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}
