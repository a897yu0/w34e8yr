

function getUsagePercentage(capacity: number, freeSpace: number): number {
  return (((capacity - freeSpace) / capacity) * 100);
}

function formatTimestamp(timestamp: Date): string {
  return timestamp.toLocaleString();
}

function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function isWithinLastNMinutes(timestamp: Date, minutes: number): boolean {
  const now = new Date();
  const diffInMs = now.getTime() - timestamp.getTime();
  return diffInMs < (minutes * 60 * 1000);
}

export {
  getUsagePercentage,
  formatTimestamp,
  formatBytes,
  isWithinLastNMinutes as isWithinLastNMinutes,
};
