import type { ServerDetails } from "./ServerDetails";

interface UserData {
  serverList: ServerDetails[];

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
