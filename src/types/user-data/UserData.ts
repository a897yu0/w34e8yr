import type { ServerDetails } from "./ServerDetails";

interface UserData {
  serverList: ServerDetails[];

  adminPage: {
    sidebar: {
      width: number;
    };
    serversManagementPanel: {
      serverTable: {
        height: number;
      };
    };
  };
}

export type { UserData };
