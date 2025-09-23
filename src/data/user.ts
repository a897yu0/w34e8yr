
import React from "react";

import type { ServerData } from "@/types/data/ServerData";
import type { UserData } from "@/types/data/UserData";

import {
  getValidBoolean,
  getValidPositiveNumber,
  getValidInteger,
  getValidString,
  getValidDate,
  getValidPositiveIntegerOrDefault,
} from "@/validators";

interface UserDataContextValueType {
  data: UserData;

  set(f: (data: UserData) => void): void;
}

const defaultUserData: Readonly<UserData> = {
  serverList: [],
  selectedServerId: Number.MAX_SAFE_INTEGER,
};

const UserDataContext = React.createContext<UserDataContextValueType>(null as any);

function parseServerDetails(data: any): ServerData | undefined {
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

function parseServerList(data: any): ServerData[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(item => parseServerDetails(item))
    .filter((serverDetail: ServerData | undefined) => (serverDetail !== undefined));
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

  };
}

function saveUserData(data: UserData): void {
  localStorage.setItem('user', JSON.stringify(data));
}

function useUserDataContext(): UserDataContextValueType {
  return React.useContext(UserDataContext);
}

export { defaultUserData, loadUserData, saveUserData, UserDataContext, useUserDataContext };
export type { UserDataContextValueType };
