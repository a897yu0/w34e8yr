import type { Server } from "./Server";

interface User {
  serverList: Server[];
  selectedServerIndex: number;

}

export type { User };
