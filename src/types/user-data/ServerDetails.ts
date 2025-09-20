

interface ServerDetails {
  id: number;

  name: string;
  address: string;
  port: number;

  isOnline: boolean;
  lastPingTimestamp: Date;
  registeredTimestamp: Date;
  accountRequired: boolean;

  capacity: number;
  freeSpace: number;
}

export type { ServerDetails };
