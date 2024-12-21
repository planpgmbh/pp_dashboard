import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ExportSettingsModal } from './ExportSettingsModal';

export function ExportSettingsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Settings className="h-4 w-4" />
        Export Settings
      </button>

      {isModalOpen && (
        <ExportSettingsModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}