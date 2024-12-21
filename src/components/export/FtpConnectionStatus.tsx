import React from 'react';
import { Terminal } from 'lucide-react';

interface FtpConnectionStatusProps {
  messages: string[];
}

export function FtpConnectionStatus({ messages }: FtpConnectionStatusProps) {
  return (
    <div className="mt-4 bg-gray-900 rounded-lg p-4 max-h-40 overflow-y-auto">
      <div className="flex items-center gap-2 mb-2">
        <Terminal className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-400">FTP Server Response</span>
      </div>
      <div className="font-mono text-sm">
        {messages.map((message, index) => (
          <div key={index} className="text-green-400">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}