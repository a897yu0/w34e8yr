import type { Server } from "./Server";

interface User {
  serverList: Server[];
  selectedServerId: number;

}

export type { User };
