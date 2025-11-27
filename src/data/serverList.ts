import type { Server } from "@/types/Server";

function loadServerList(): Server[] | undefined {
  const strLayoutData: string | null = localStorage.getItem('serverList');

  if (!strLayoutData) { return undefined; }

  return JSON.parse(strLayoutData).map((server: any) => ({
    ...server,
    lastPing: new Date(server.lastPing),
    registered: new Date(server.registered)
  })) as Server[];
}

let timeout: NodeJS.Timeout | null = null;
let serverListData: Server[] = loadServerList() || [];

function saveServerListData(data: Server[]): void {
  serverListData = data;

  if (!timeout) {
    timeout = setTimeout(() => {
      localStorage.setItem('serverList', JSON.stringify(serverListData));
      timeout = null;
    }, 1000);
  }
}

export { serverListData, saveServerListData };