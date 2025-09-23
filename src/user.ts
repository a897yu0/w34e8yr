
import type { ServerDetails } from "@/types/user-data/ServerDetails";
import type { UserData } from "@/types/user-data/UserData";
import React from "react";

interface UserDataContextValueType {
  data: UserData;

  set(f: (data: UserData) => void): void;
}

const defaultUserData: Readonly<UserData> = {
  serverList: [],
  selectedServerId: Number.MAX_SAFE_INTEGER,

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

const UserDataContext = React.createContext<UserDataContextValueType>(null as any);

function getValidBoolean(value: any): boolean | undefined {
  if (typeof value !== 'boolean') {
    return undefined;
  }

  return value as boolean;
}

function getValidNumber(value: any): number | undefined {
  if ((typeof value === 'number') && !isNaN(value) && isFinite(value)) {
    return value;
  }

  return undefined;
}

function getValidPositiveNumber(value: any): number | undefined {
  const n: number | undefined = getValidNumber(value);

  if (!n || (n <= 0)) {
    return undefined;
  }

  return n;
}

function getValidInteger(value: any): number | undefined {
  const n: number | undefined = getValidNumber(value);

  if (!n || !Number.isInteger(n)) {
    return undefined;
  }

  return n;
}

function getValidPositiveInteger(value: any): number | undefined {
  const n: number | undefined = getValidInteger(value);

  if (!n || (n <= 0)) {
    return undefined;
  }

  return n;
}

function getValidString(value: any): string | undefined {
  if ((typeof value !== 'string') || value.trim() === '') {
    return undefined;
  }

  return value as string;
}

function getValidDate(value: any): Date | undefined {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

function getValidBooleanOrDefault(value: any, defaultValue: boolean): boolean {
  const f: boolean | undefined = getValidBoolean(value);

  if (!f) {
    return defaultValue;
  }

  return f;
}

function getValidNumberOrDefault(value: any, defaultValue: number): number {
  const n: number | undefined = getValidNumber(value);

  if (!n) {
    return defaultValue;
  }

  return value;
}

function getValidPositiveNumberOrDefault(value: any, defaultValue: number): number {
  const n: number | undefined = getValidPositiveNumber(value);

  if (!n) {
    return defaultValue;
  }

  return value;
}

function getValidIntegerOrDefault(value: any, defaultValue: number): number {
  const n: number | undefined = getValidInteger(value);

  if (!n) {
    return defaultValue;
  }

  return value;
}

function getValidPositiveIntegerOrDefault(value: any, defaultValue: number): number {
  const n: number | undefined = getValidPositiveInteger(value);

  if (!n) {
    return defaultValue;
  }

  return value;
}

function getValidStringOrDefault(value: any, defaultValue: string): string {
  const str: string | undefined = getValidString(value);

  if (!str) {
    return defaultValue;
  }

  return str;
}

function getValidDateOrDefault(value: any, defaultValue: Date): Date {
  const date = getValidDate(value);

  if (!date) {
    return defaultValue;
  }

  return date;
}

function parseServerDetails(data: any): ServerDetails | undefined {
  try {
    // Check if data exists and is an object
    if (!data || (typeof data !== 'object')) {
      return undefined;
    }

    const id: number | undefined = getValidInteger(data.id);

    if (!id) {
      return undefined;
    }

    const name: string | undefined = getValidString(data.name);

    if (!name) {
      return undefined;
    }

    const address: string | undefined = getValidString(data.address);

    if (!address) {
      return undefined;
    }

    const isOnline: boolean | undefined = getValidBoolean(data.isOnline);

    if (!isOnline) {
      return undefined;
    }

    const lastPingTimestamp: Date | undefined = getValidDate(data.lastPingTimestamp);

    if (!lastPingTimestamp) {
      return undefined;
    }

    const registeredTimestamp: Date | undefined = getValidDate(data.registeredTimestamp);

    if (!registeredTimestamp) {
      return undefined;
    }

    const accountRequired: boolean | undefined = getValidBoolean(data.accountRequired);

    if (!accountRequired) {
      return undefined;
    }

    const capacity: number | undefined = getValidPositiveNumber(data.capacity);

    if (!capacity) {
      return undefined;
    }

    const freeSpace: number | undefined = getValidPositiveNumber(data.freeSpace);

    if (!freeSpace) {
      return undefined;
    }

    if (freeSpace > capacity) {
      return undefined;
    }

    return {
      id: id,

      name: name,
      address: address,

      isOnline: isOnline,
      lastPingTimestamp: lastPingTimestamp,
      registeredTimestamp: registeredTimestamp,
      accountRequired: accountRequired,

      capacity: capacity,
      freeSpace: freeSpace,
    };
  } catch (error) {
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

function loadUserData(): UserData | undefined {
  const strUserData: string | null = localStorage.getItem('user');

  if (!strUserData) {
    return undefined;
  }

  const unknownUserData: any = JSON.parse(strUserData);

  return {
    serverList: parseServerList(unknownUserData?.serverList),
    selectedServerId: getValidPositiveIntegerOrDefault(
      unknownUserData?.selectedServerId,
      defaultUserData.selectedServerId,
    ),

    adminPage: {
      sidebar: {
        width: getValidPositiveNumberOrDefault(
          unknownUserData?.adminPage?.sidebar?.width,
          defaultUserData.adminPage.sidebar.width,
        ),
      },
      serverManagementPanel: {
        serverTable: {
          height: getValidPositiveNumberOrDefault(
            unknownUserData?.adminPage?.serverManagementPanel?.serverTable?.height,
            defaultUserData.adminPage.serverManagementPanel.serverTable.height,
          ),
        },
      },
    },
  };
}

function saveUserData(data: UserData): void {
  localStorage.setItem('user', JSON.stringify(data));
}

getValidBoolean;
getValidNumber;
getValidPositiveNumber;
getValidInteger;
getValidPositiveInteger;
getValidString;
getValidDate;
getValidBooleanOrDefault;
getValidNumberOrDefault;
getValidPositiveNumberOrDefault;
getValidIntegerOrDefault;
getValidPositiveIntegerOrDefault;
getValidStringOrDefault;
getValidDateOrDefault;

function useUserDataContext(): UserDataContextValueType {
  return React.useContext(UserDataContext);
}

export { defaultUserData, loadUserData, saveUserData, UserDataContext, useUserDataContext };
export type { UserDataContextValueType };
