import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ExportScheduleSelect } from './ExportScheduleSelect';
import { FtpSettingsForm } from './FtpSettingsForm';
import { ExportStatus } from './ExportStatus';
import { triggerManualExport } from '../../services/exportService';
import { ExportStatus as ExportStatusType } from '../../types/export';
import { translations } from '../../utils/translations';

interface ExportSettingsModalProps {
  onClose: () => void;
}

export function ExportSettingsModal({ onClose }: ExportSettingsModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<ExportStatusType>({
    isActive: false,
    lastExport: null,
    filesUploaded: 0,
    filesSkipped: 0,
    inProgress: false
  });

  const handleManualExport = async () => {
    setIsExporting(true);
    setExportStatus(prev => ({ ...prev, inProgress: true }));
    
    try {
      const status = await triggerManualExport();
      setExportStatus(status);
    } catch (error) {
      alert(translations['Failed to connect to FTP server']);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{translations['Export Settings']}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <ExportStatus status={exportStatus} />
          <ExportScheduleSelect />
          <FtpSettingsForm />
          
          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={handleManualExport}
              disabled={isExporting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? translations['Exporting...'] : translations['Export Now']}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}