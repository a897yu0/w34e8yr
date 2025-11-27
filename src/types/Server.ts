interface Server {
  name: string;
  address: string;

  registered: Date;
  lastPing: Date;

  storages: {
    id: string;
    username?: string;
  }[];
}

export type { Server };