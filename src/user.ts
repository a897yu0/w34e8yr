import type { ServerDetails } from "./types/user-data/ServerDetails";
import type { UserData } from "./types/user-data/UserData";

const defaultUserData: Readonly<UserData> = {
  serverList: [],

  adminPage: {
    sidebar: {
      width: 277,  // TODO: Make configurable with .env
    },
    serverManagementPanel: {
      serverTable: {
        height: 177,  // TODO: Make configurable with .env
      },
    },
  },
};

let userData: UserData = structuredClone(defaultUserData);

let timeout: NodeJS.Timeout | undefined = undefined;

function parseServerDetails(data: any): ServerDetails | undefined {
  try {
    // Check if data exists and is an object
    if (!data || (typeof data !== 'object')) {
      return undefined;
    }

    // Validate each field with strict type checking
    if ((typeof data.id !== 'number') || !Number.isInteger(data.id)) {
      return undefined;
    }

    if ((typeof data.name !== 'string') || data.name.trim() === '') {
      return undefined;
    }

    if ((typeof data.ipAddress !== 'string') || data.ipAddress.trim() === '') {
      return undefined;
    }

    if (typeof data.isOnline !== 'boolean') {
      return undefined;
    }

    // Validate dates - they could be strings that need parsing
    const lastPing = new Date(data.lastPingTimestamp);
    if (isNaN(lastPing.getTime())) {
      return undefined;
    }

    const registered = new Date(data.registeredTimestamp);
    if (isNaN(registered.getTime())) {
      return undefined;
    }

    if (typeof data.accountRequired !== 'boolean') {
      return undefined;
    }

    if ((typeof data.capacity !== 'number') || data.capacity < 0 || !Number.isFinite(data.capacity)) {
      return undefined;
    }

    if ((typeof data.freeSpace !== 'number') || data.freeSpace < 0 || !Number.isFinite(data.freeSpace)) {
      return undefined;
    }

    // Additional business logic validation
    if (data.freeSpace > data.capacity) {
      return undefined; // Free space can't be more than capacity
    }

    // If all validations pass, create the object
    return {
      id: data.id,

      name: data.name.trim(),
      address: data.ipAddress.trim(),
      isOnline: data.isOnline,
      lastPingTimestamp: lastPing,
      registeredTimestamp: registered,
      accountRequired: data.accountRequired,

      capacity: data.capacity,
      freeSpace: data.freeSpace,
    };
  } catch (error) {
    // Any unexpected error returns undefined
    return undefined;
  }
}

function parseServerList(data: any): ServerDetails[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(item => parseServerDetails(item))
    .filter((serverDetail: ServerDetails | undefined) => (serverDetail !== undefined));
}

function getValidNumber(value: any, defaultValue: number): number {
  if ((typeof value === 'number') && !isNaN(value) && isFinite(value)) {
    return value;
  }

  return defaultValue;
}

function isUserDataReady(): boolean {
  const strUserData: string | null = localStorage.getItem('user');

  if (!strUserData) {
    return false;
  }

  const unknownUserData: any = JSON.parse(strUserData);

  userData = {
    serverList: parseServerList(unknownUserData?.serverList),

    adminPage: {
      sidebar: {
        width: getValidNumber(unknownUserData?.adminPage?.sidebar?.width, defaultUserData.adminPage.sidebar.width),
      },
      serverManagementPanel: {
        serverTable: {
          height: getValidNumber(unknownUserData?.adminPage?.serverManagementPanel?.serverTable?.height, defaultUserData.adminPage.serverManagementPanel.serverTable.height),
        },
      },
    },
  };

  return true;
}

function saveUserData(): void {
  if (!timeout) {
    timeout = setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(userData));
      timeout = undefined;
    }, 1000);

  }
}

function getDefaultUserData(): UserData {
  return defaultUserData;
}

function getUserData(): UserData {
  return userData;
}

function setUserData(f: (userData: UserData) => void): void {
  f(userData);

  saveUserData();
}

export { isUserDataReady, saveUserData, getDefaultUserData, getUserData, setUserData };
