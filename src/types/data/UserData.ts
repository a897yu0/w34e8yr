import type { ServerData } from "./ServerData";

interface UserData {
  serverList: ServerData[];
  selectedServerId: number;
  
}

export type { UserData };
