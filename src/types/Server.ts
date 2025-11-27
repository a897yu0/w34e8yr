

interface Server {
  name: string;
  address: string;
  
  firstRegistered: Date;
  lastPing: Date;

  storages: number;
  devices: number;

  capacity: number;
  freeSpace: number;
}

export type { Server };