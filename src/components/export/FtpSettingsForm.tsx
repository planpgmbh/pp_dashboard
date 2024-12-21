import React, { useState } from 'react';
import { useExportSettings } from '../../hooks/useExportSettings';
import { testFtpConnection } from '../../services/ftpService';
import { FtpTestResult } from '../../types/export';
import { Check, X, Loader2 } from 'lucide-react';
import { translations } from '../../utils/translations';
import { FtpConnectionStatus } from './FtpConnectionStatus';

export function FtpSettingsForm() {
  const { ftpSettings, updateFtpSettings } = useExportSettings();
  const [testResult, setTestResult] = useState<FtpTestResult | null>(null);
  const [testing, setTesting] = useState(false);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      const result = await testFtpConnection(ftpSettings);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: translations['Connection test failed'],
        timestamp: new Date().toISOString(),
        messages: ['> Connection test failed']
      });
    } finally {
      setTesting(false);
    }
  };

  const isFormValid = ftpSettings.host && 
                     ftpSettings.port && 
                     ftpSettings.username && 
                     ftpSettings.password &&
                     ftpSettings.path;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{translations['FTP Settings']}</h3>
        <button
          onClick={handleTestConnection}
          disabled={testing || !isFormValid}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {testing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {translations['Testing...']}
            </>
          ) : (
            <>
              {testResult?.success ? (
                <Check className="h-4 w-4" />
              ) : testResult?.success === false ? (
                <X className="h-4 w-4" />
              ) : null}
              {translations['Test Connection']}
            </>
          )}
        </button>
      </div>

      {testResult && (
        <div className={`flex items-center gap-2 text-sm p-3 rounded ${
          testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {testResult.success ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
          <span>{testResult.message}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {translations['Host']}
          </label>
          <input
            type="text"
            value={ftpSettings.host}
            onChange={(e) => updateFtpSettings({ ...ftpSettings, host: e.target.value })}
            placeholder="ftp.example.com"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {translations['Port']}
          </label>
          <input
            type="number"
            value={ftpSettings.port}
            onChange={(e) => updateFtpSettings({ ...ftpSettings, port: parseInt(e.target.value) || 21 })}
            min="1"
            max="65535"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {translations['Username']}
          </label>
          <input
            type="text"
            value={ftpSettings.username}
            onChange={(e) => updateFtpSettings({ ...ftpSettings, username: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {translations['Password']}
          </label>
          <input
            type="password"
            value={ftpSettings.password}
            onChange={(e) => updateFtpSettings({ ...ftpSettings, password: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {translations['Path']}
          </label>
          <input
            type="text"
            value={ftpSettings.path}
            onChange={(e) => updateFtpSettings({ ...ftpSettings, path: e.target.value })}
            placeholder="/exports"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500">
            {translations['Path must start with /']}
          </p>
        </div>
      </div>

      {testResult?.messages && <FtpConnectionStatus messages={testResult.messages} />}
    </div>
  );
}