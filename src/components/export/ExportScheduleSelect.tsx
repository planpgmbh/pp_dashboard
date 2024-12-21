import React from 'react';
import { useExportSettings } from '../../hooks/useExportSettings';
import { Clock } from 'lucide-react';
import { translations } from '../../utils/translations';

export function ExportScheduleSelect() {
  const { schedule, updateSchedule, scheduleConfig, updateScheduleConfig } = useExportSettings();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {translations['Export Schedule']}
        </label>
        <select
          value={schedule}
          onChange={(e) => updateSchedule(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="manual">{translations['Manual Only']}</option>
          <option value="daily">{translations['Daily']}</option>
          <option value="weekly">{translations['Weekly']}</option>
          <option value="monthly">{translations['Monthly']}</option>
        </select>
      </div>

      {schedule !== 'manual' && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-md">
          <Clock className="h-5 w-5 text-gray-400" />
          <div className="text-sm text-gray-600">
            {schedule === 'daily' && (
              <p>Export läuft täglich um {scheduleConfig.time} Uhr</p>
            )}
            {schedule === 'weekly' && (
              <p>Export läuft jeden Sonntag um {scheduleConfig.time} Uhr</p>
            )}
            {schedule === 'monthly' && (
              <p>Export läuft am 1. des Monats um {scheduleConfig.time} Uhr</p>
            )}
          </div>
        </div>
      )}

      {schedule !== 'manual' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {translations['Export Time']}
          </label>
          <input
            type="time"
            value={scheduleConfig.time}
            onChange={(e) => updateScheduleConfig({ ...scheduleConfig, time: e.target.value })}
            className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}