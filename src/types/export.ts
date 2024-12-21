export type ExportScheduleType = 'manual' | 'daily' | 'weekly' | 'monthly';

export interface FtpSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  path: string;
}

export interface ScheduleConfig {
  type: ExportScheduleType;
  weeklyDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  monthlyDay: number;
  time: string;
}

export interface FtpTestResult {
  success: boolean;
  message: string;
  timestamp: string;
  messages: string[];
}

export interface ExportStatus {
  isActive: boolean;
  lastExport: string | null;
  filesUploaded: number;
  filesSkipped: number;
  inProgress: boolean;
  messages?: string[]; // Added messages array to track progress
}

export type FileUploadStatus = {
  fileName: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
};