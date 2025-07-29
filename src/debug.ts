// Prop Utility for debugging 
interface DebugProps {
  label: string;
  data?: any;
  level?: 'info' | 'error' | 'warn' | 'success';
}

// Logs debug UPDATED v3.7 to show New Console Logs instead of just "Error"
export function logDebug(label: string, data?: any, level: 'info' | 'error' | 'warn' | 'success' = 'info') {
  const prefixMap = {
    info: 'Info:',
    error: 'Error Bug!',
    warn: 'Warning:',
    success: 'Success:',
  };

  const prefix = prefixMap[level] || '🔍 Debug:';

  console.log(`${prefix} ${label}`, data ?? '');
}
