
import React from "react";

import type { Server } from "@/types/Server";
import type { User } from "@/types/User";

import {
  getValidBoolean,
  getValidPositiveNumber,
  getValidString,
  getValidDate,
  getValidPositiveIntegerOrDefault,
} from "@/validators";
import sampleServerList from "@/sampleServerList";

const defaultUser: Readonly<User> = {
  serverList: [
    ...sampleServerList,
  ],
  selectedServerIndex: Number.MAX_SAFE_INTEGER,
};

function parseServer(data: any): Server | undefined {
  try {
    // Check if data exists and is an object
    if (!data || (typeof data !== 'object')) {
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

function parseServerList(data: any): Server[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map(item => parseServer(item))
    .filter((serverDetail: Server | undefined) => (serverDetail !== undefined));
}

function loadUser(): User | null {
  const item: string | null = localStorage.getItem('user');

  if (!item) {
    return null;
  }

  const unknownUser: any = JSON.parse(item);

  return {
    serverList: parseServerList(unknownUser?.serverList),
    selectedServerIndex: getValidPositiveIntegerOrDefault(
      unknownUser?.selectedServerId,
      defaultUser.selectedServerIndex,
    ),

  };
}

let timeout: NodeJS.Timeout | null = null;
let user: User | null = loadUser();

function saveUser(): void {
  if (!timeout) {
    timeout = setTimeout(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        timeout = null;
      }
    }, 1000);
  }


}

function setUserWithSaving(dispatch: (user: User) => void): User {
  if (!user) {
    throw new Error("Invalid user data");
  }

  dispatch(user);

  if (!timeout) {
    timeout = setTimeout(() => {
      saveUser();
      timeout = null;
    }, 1000);
  }

  return user;
}

function useUserDataReady(): {
  isReady: boolean;
  prepare: () => void;
} {
  const [isReady, setIsReady] = React.useState<boolean>(user !== null);

  return {
    isReady: isReady,
    prepare: () => {
      if (user) {
        return;
      }

      user = structuredClone(defaultUser);
      saveUser();

      setIsReady(user !== null);
    },
  }
}

function useUser(): [User, (dispatch: (user: User) => void) => void] {
  if (!user) {
    throw new Error("Invalid user data");
  }

  const [_user, _setUser] = React.useState<Readonly<User>>({ ...user });

  return [
    _user,
    (dispatch: (data: User) => void) => {
      _setUser({ ...setUserWithSaving(dispatch) })
    },
  ];
}

export { defaultUser as defaultUserData, useUserDataReady, useUser };
