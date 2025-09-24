

interface Server {
  id: number;

  name: string;
  address: string;
  
  isOnline: boolean;
  lastPingTimestamp: Date;
  registeredTimestamp: Date;
  accountRequired: boolean;

  capacity: number;
  freeSpace: number;
}

export type { Server };
