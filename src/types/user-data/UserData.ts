import type { ServerDetails } from "./ServerDetails";

interface UserData {
  serverList: ServerDetails[];
  selectedServerId: number;

  adminPage: {
    sidebar: {
      width: number;
    };
    serverManagementPanel: {
      serverTable: {
        height: number;
      };
    };
  };
}

export type { UserData };
