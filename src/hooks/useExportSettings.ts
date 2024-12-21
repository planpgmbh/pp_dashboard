import { useState, useCallback } from 'react';
import { FtpSettings, ScheduleConfig, ExportScheduleType } from '../types/export';

export function useExportSettings() {
  const [schedule, setSchedule] = useState<ExportScheduleType>('manual');
  const [scheduleConfig, setScheduleConfig] = useState<ScheduleConfig>({
    type: 'manual',
    weeklyDay: 0,
    monthlyDay: 1,
    time: '00:00'
  });
  
  const [ftpSettings, setFtpSettings] = useState<FtpSettings>({
    host: 'plan-p.com',
    port: 21,
    username: 'buchhaltung',
    password: 'rcT5LG4FAjJX2qN',
    path: '/testing/'
  });

  const updateSchedule = useCallback((newSchedule: ExportScheduleType) => {
    setSchedule(newSchedule);
    setScheduleConfig(prev => ({ ...prev, type: newSchedule }));
  }, []);

  const updateScheduleConfig = useCallback((newConfig: ScheduleConfig) => {
    setScheduleConfig(newConfig);
  }, []);

  const updateFtpSettings = useCallback((newSettings: FtpSettings) => {
    setFtpSettings(newSettings);
  }, []);

  return {
    schedule,
    scheduleConfig,
    ftpSettings,
    updateSchedule,
    updateScheduleConfig,
    updateFtpSettings
  };
}