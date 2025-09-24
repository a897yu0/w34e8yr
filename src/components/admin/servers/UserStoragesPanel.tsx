import React from 'react';

import type { AdminMainPanelProps } from '@/types/props/admin/AdminMainPanelProps';
import type { Server } from '@/types/Server';

import ServerDetails from '@/components/ServerDetails';

import type { User } from '@/types/User';
import { useUser } from '@/user';

function UserStoragesPanel(props: AdminMainPanelProps): React.JSX.Element {
  props;

  const [currentServer, setCurrentServer] = React.useState<Server | undefined>(undefined);

  const [user, setUser] = useUser();
  currentServer; setCurrentServer;

  return (
    <>
      {/* Header */}
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-5">User Storages</h1>

        <div className="w-fit">
          {user && (
            <select
              value={user.selectedServerId}
              onChange={(e) => setUser((user: User) => {
                user.selectedServerId = parseInt(e.target.value, 10);
              })}
              className="w-full px-3 py-2 border-1 border-black text-black"
            >
              <option value={Number.MAX_SAFE_INTEGER}>
                {user.serverList.length === 0 ? "No servers available" : "Select a server"}
              </option>
              {user.serverList.map((server: Server, index: number) => {
                console.assert(server.id < Number.MAX_SAFE_INTEGER);
                return (
                  <option key={index} value={server.id}>{server.name}</option>
                );
              })}
            </select>
          )}
        </div>
      </div>

      <div className="w-full border-black border-b-1 my-4" />

      {/* Server Details */}
      <div className="max-w-4xl w-full">
        <div className="@container flex flex-col items-start">
          <ServerDetails
            server={{
              id: 5,

              name: 'office-public',
              address: '192.168.1.101',

              isOnline: false,
              lastPingTimestamp: new Date('2024-01-14T15:20:00'),
              registeredTimestamp: new Date('2024-01-05T11:30:00'),
              accountRequired: false,

              capacity: 4327819519847,
              freeSpace: 434578903425,
            }}
          />
        </div>
      </div>

      <div className="w-full border-black border-b-1 my-4" />

    </>
  );
}

export default UserStoragesPanel;
