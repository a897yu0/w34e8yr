interface Server {
  name: string;
  address: string;

  registered: Date;
  lastPing: Date;

  storages: string[];
}

export type { Server };