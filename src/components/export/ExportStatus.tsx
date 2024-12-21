import React from 'react';
import { Clock, Upload, Check } from 'lucide-react';
import { ExportStatus as ExportStatusType } from '../../types/export';
import { translations } from '../../utils/translations';
import { FtpConnectionStatus } from './FtpConnectionStatus';

interface ExportStatusProps {
  status: ExportStatusType;
}

export function ExportStatus({ status }: ExportStatusProps) {
  if (!status.isActive && !status.inProgress) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {status.inProgress ? (
            <Upload className="h-5 w-5 text-blue-500 animate-pulse" />
          ) : (
            <Check className="h-5 w-5 text-green-500" />
          )}
          <span className="font-medium">
            {status.inProgress ? translations['Export in progress...'] : translations['Last export completed']}
          </span>
        </div>
        {status.lastExport && (
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{new Date(status.lastExport).toLocaleString('de-DE')}</span>
          </div>
        )}
      </div>
      
      {(status.filesUploaded > 0 || status.filesSkipped > 0) && (
        <div className="mt-3 flex gap-4 text-sm">
          <div className="text-green-600">
            <span className="font-medium">{status.filesUploaded}</span> {translations['files uploaded']}
          </div>
          <div className="text-gray-500">
            <span className="font-medium">{status.filesSkipped}</span> {translations['files skipped']}
          </div>
        </div>
      )}

      {status.messages && status.messages.length > 0 && (
        <FtpConnectionStatus messages={status.messages} />
      )}
    </div>
  );
}