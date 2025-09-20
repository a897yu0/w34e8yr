

interface ServerDetails {
  id: number;

  name: string;
  ipAddress: string;
  isOnline: boolean;
  lastPingTimestamp: Date;
  registeredTimestamp: Date;
  accountRequired: boolean;

  capacity: number;
  freeSpace: number;
}

export type { ServerDetails };
