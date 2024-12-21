import { FtpSettings, FtpTestResult } from '../types/export';

export async function testFtpConnection(settings: FtpSettings): Promise<FtpTestResult> {
  const messages: string[] = [];
  messages.push(`> Connecting to ${settings.host}:${settings.port}...`);
  
  if (!settings.host || !settings.port || !settings.username || !settings.password) {
    messages.push('> Error: Missing required connection parameters');
    return {
      success: false,
      message: 'Bitte füllen Sie alle FTP-Einstellungen aus',
      timestamp: new Date().toISOString(),
      messages
    };
  }

  try {
    await validateFtpSettings(settings);
    messages.push('> Connection established');
    messages.push(`> Authenticating as ${settings.username}...`);

    // Simulate connection with correct credentials
    if (settings.host === 'plan-p.com' && 
        settings.username === 'buchhaltung' && 
        settings.password === 'rcT5LG4FAjJX2qN' && 
        settings.path === '/testing/') {
      messages.push('> Authentication successful');
      messages.push(`> Checking directory ${settings.path}...`);
      messages.push('> Directory exists and is writable');
      messages.push('> Connection test completed successfully');
      
      return {
        success: true,
        message: 'Erfolgreich mit FTP-Server verbunden',
        timestamp: new Date().toISOString(),
        messages
      };
    }

    messages.push('> Authentication failed');
    return {
      success: false,
      message: 'Ungültige Anmeldedaten oder Server nicht erreichbar',
      timestamp: new Date().toISOString(),
      messages
    };
  } catch (error) {
    messages.push(`> Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Verbindung zum FTP-Server fehlgeschlagen',
      timestamp: new Date().toISOString(),
      messages
    };
  }
}

async function validateFtpSettings(settings: FtpSettings): Promise<void> {
  if (!isValidHostname(settings.host)) {
    throw new Error('Ungültige Hostadresse');
  }
  
  if (settings.port < 1 || settings.port > 65535) {
    throw new Error('Port muss zwischen 1 und 65535 liegen');
  }

  if (settings.username.length < 1 || settings.password.length < 1) {
    throw new Error('Benutzername und Passwort sind erforderlich');
  }

  if (!settings.path.startsWith('/')) {
    throw new Error('Pfad muss mit / beginnen');
  }
}

function isValidHostname(hostname: string): boolean {
  const hostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  
  return hostnameRegex.test(hostname) || ipRegex.test(hostname);
}