// Prop Utily for debugging 
interface DebugProps {
  label: string;
  data: any;
}

// Logs debug 
export function logDebug(label: string, data?: any) {
  console.log('Error Bug! :', label, data);
}

