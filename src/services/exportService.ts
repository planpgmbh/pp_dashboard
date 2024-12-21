import { ExportStatus, FileUploadStatus } from '../types/export';
import { getExpenses } from './harvestApi';

// Get all receipt URLs from expenses
async function getReceiptFiles(from: string, to: string): Promise<string[]> {
  const expenses = await getExpenses(from, to);
  return expenses
    .filter(expense => expense.receipt?.url)
    .map(expense => {
      const url = expense.receipt!.url;
      // Extract filename from URL
      const fileName = url.split('/').pop() || `receipt_${expense.id}.pdf`;
      return fileName;
    });
}

// Simulated function to check if a file exists on FTP
async function checkFileExists(fileName: string): Promise<boolean> {
  // In a real implementation, this would check the FTP server
  return new Promise(resolve => {
    setTimeout(() => resolve(Math.random() > 0.5), 100);
  });
}

// Simulated function to upload file to FTP
async function uploadFile(fileName: string): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 500);
  });
}

export async function triggerManualExport(): Promise<ExportStatus> {
  const status: ExportStatus = {
    isActive: true,
    lastExport: new Date().toISOString(),
    filesUploaded: 0,
    filesSkipped: 0,
    inProgress: true,
    messages: ['> Starting export process...']
  };

  try {
    // Get date range for last month
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      .toISOString().split('T')[0];
    const to = new Date(now.getFullYear(), now.getMonth(), 0)
      .toISOString().split('T')[0];

    status.messages?.push(`> Fetching receipts from ${from} to ${to}`);
    const files = await getReceiptFiles(from, to);
    
    if (files.length === 0) {
      status.messages?.push('> No receipts found for the selected period');
      status.inProgress = false;
      return status;
    }

    status.messages?.push(`> Found ${files.length} receipts to process`);

    for (const fileName of files) {
      status.messages?.push(`> Processing ${fileName}`);
      
      try {
        const exists = await checkFileExists(fileName);
        if (exists) {
          status.filesSkipped++;
          status.messages?.push(`> ${fileName} already exists on server, skipping`);
        } else {
          const uploaded = await uploadFile(fileName);
          if (uploaded) {
            status.filesUploaded++;
            status.messages?.push(`> Successfully uploaded ${fileName}`);
          } else {
            throw new Error('Upload failed');
          }
        }
      } catch (error) {
        status.messages?.push(`> Error processing ${fileName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    status.messages?.push('> Export process completed');
  } catch (error) {
    status.messages?.push(`> Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    status.inProgress = false;
  }

  return status;
}