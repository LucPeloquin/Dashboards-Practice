export const getLocalTime = (timezone: number): string => {
  try {
    // Get current time in UTC
    const now = new Date();
    
    // Get UTC time in milliseconds
    const utcMillis = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    
    // Add the location's timezone offset
    const locationMillis = utcMillis + (timezone * 1000);
    
    // Create new date with the correct timezone
    const locationTime = new Date(locationMillis);
    
    return locationTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error calculating local time:', error);
    return '-- : --';
  }
}; 