/**
 * Normalize a port into a number, string, or false.
 */
 export default function normalizePort(val: any): any {
    const port = parseInt(val as string, 10);
  
    // Named pipe
    if (Number.isNaN(port)) return val;
  
    // Port number
    if (port >= 0) return port;
  
    return false;
  }
  