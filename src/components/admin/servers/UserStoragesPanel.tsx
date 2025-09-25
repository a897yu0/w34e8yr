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
  user as User;
  setUser;
  currentServer; setCurrentServer;

  const selectServer = (index: number) => {
    console.assert(index >= 0);
    console.assert(index < user.serverList.length);
    console.assert(Number.isInteger(index));

    setUser((user: User) => {
      const server: Server = user.serverList.splice(index, 1)[0];
      user.serverList.unshift(server);

    });

  };

  return (
    <>
      {/* Header */}
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-5">User Storages</h1>
      </div>

      <div className="w-full border-black border-b-1 my-4" />

      {/* Server Details */}
      <div className="max-w-4xl w-full border p-2">
        {(user.serverList.length > 0) ? (
          <>
            <div className="w-fit mb-4">
              <select
                value={0}
                onChange={(e) => selectServer(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 border-1 border-black text-black"
              >
                {user.serverList.map((server: Server, index: number) => <option key={index} value={index}>{server.name}</option>)}
              </select>
            </div>
            <div className="@container flex flex-col items-start">
              <ServerDetails server={user.serverList[0]} />
            </div>
          </>
        ) : (
          <>
            <div className="w-fit mb-4">
              <select
                value={0}
                className="w-full px-3 py-2 border-1 border-black text-black"
              >
                <option key={0} value={0}>No servers available</option>
              </select>
            </div>
          </>
        )}
      </div>


      <div className="w-full border-black border-b-1 my-4" />

    </>
  );
}

export default UserStoragesPanel;
