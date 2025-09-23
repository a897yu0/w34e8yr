import clsx from 'clsx';
import React from 'react';

import type { AdminMainPanelProps } from '@/types/props/admin/AdminMainPanelProps';
import type { ServerData } from '@/types/data/ServerData';

import ResizableVerticalWrapper from '@/components/ResizableVerticalWrapper';
import Paginator from '@/components/Paginator';

import type { UserData } from '@/types/data/UserData';
import { defaultUserData, useUserDataContext } from '@/data/user';

import type { LayoutData } from '@/types/data/LayoutData';
import { defaultLayoutData, layoutData, setLayoutData } from '@/data/layout';

import sampleServerList from './sampleServerList';

interface PaginatedServerList {
  items: ServerData[];

  currentPage: number;
  totalPages: number;
}

function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatTimestamp(timestamp: Date): string {
  return timestamp.toLocaleString();
};

function getPaginatedServerList(page: number, pageSize: number = 3): PaginatedServerList {
  if (pageSize <= 0) {
    throw new Error(`Invalid page size: ${pageSize} <= 0`);
  };

  // Sort servers by order first
  const sortedServers = [...sampleServerList].sort((a, b) => b.id - a.id);

  const totalItems = sortedServers.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages));

  // Calculate start and end indices
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: sortedServers.slice(startIndex, endIndex),

    currentPage: currentPage,
    totalPages: totalPages,
  };
}

function getUsagePercentage(capacity: number, freeSpace: number): number {
  return (((capacity - freeSpace) / capacity) * 100);
}

function moveServerItemToFirst(id: number) {

  const sortedServers = [...sampleServerList].sort((a, b) => b.id - a.id);

  sampleServerList.forEach((server: ServerData) => {
    if (server.id !== id) return;

    server.id = (sortedServers[0].id + 1);
  });

}

/**
 * Features:
 * Current server count
 * Add/Remove servers with name, Server address
 * Server table (Search, Pagination, Filter) with name, Server address, online status, last ping-pong timestamp, registered timestamp, detail, Account required in server
 */
function OverviewPanel(props: AdminMainPanelProps): React.JSX.Element {
  props;

  const openPanel: (path: string) => void = props.openPanel;

  const { data: userData, set: setUserData } = useUserDataContext();
  defaultUserData;
  userData as UserData;
  setUserData;

  const serverDetailsRef = React.useRef<HTMLDivElement>(null);

  // State for table controls
  const [serverTableSearchTerm, setServerTableSearchTerm] = React.useState('');
  const [serverTableStatusFilter, setServerTableStatusFilter] = React.useState('all');
  const [serverTableCurrentPage, setServerTableCurrentPage] = React.useState(1);
  const [serverTablePageSize, setServerTablePageSize] = React.useState<number>(7);
  const [selectedServer, setSelectedServer] = React.useState<ServerData | null>(null);

  setServerTablePageSize;

  // Mock server data
  // The order is pre-sorted when this list get from DB. and the pagination is handled by partially, not paginated at the client.
  const [serverList, setServerList] = React.useState<PaginatedServerList | undefined>(undefined);

  // State for form
  const [showAddFormToAddServer, setShowAddFormToAddServer] = React.useState(false);
  const [formDataToAddServer, setFormDataToAddServer] = React.useState({
    name: '',
    address: '',
    // protocol: '',
    // port: '',
    accountRequired: false
  });

  // Add server
  const handleAddServer = () => {
    // if (formData.name && formData.serverAddress) {
    //   const newServer = {
    //     id: serverList.length + 1,
    //     name: formData.name,
    //     serverAddress: formData.serverAddress,
    //     isOnline: Math.random() > 0.5, // Random online status
    //     lastPingTimestamp: new Date(),
    //     registeredTimestamp: new Date(),
    //     accountRequired: formData.accountRequired
    //   };
    //   setServerList([...serverList, newServer]);
    //   setFormData({ name: '', serverAddress: '', accountRequired: false });
    //   setShowAddForm(false);
    // }
  };

  // Remove server
  const handleRemoveServer = (id: number) => {
    id;
    // setServerList(serverList.filter(server => server.id !== id));
    // setSelectedServer(null);
  };

  const moveItemToFirst = (id: number) => {
    moveServerItemToFirst(id);

    setServerList(getPaginatedServerList(serverTableCurrentPage, serverTablePageSize));
  };

  // Filter and search servers, The filter is handled by DB and query, not in client...
  // const filteredServers = React.useMemo(() => {
  //   return servers.filter(server => {
  //     const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       server.serverAddress.includes(searchTerm);
  //     const matchesStatus = statusFilter === 'all' ||
  //       (statusFilter === 'online' && server.isOnline) ||
  //       (statusFilter === 'offline' && !server.isOnline);
  //     return matchesSearch && matchesStatus;
  //   });
  // }, [servers, searchTerm, statusFilter]);

  React.useEffect(() => {
    setServerList(getPaginatedServerList(serverTableCurrentPage, serverTablePageSize));
  }, [serverTableCurrentPage, serverTablePageSize]);

  const openServerDetails = (server: ServerData) => {
    if (serverDetailsRef.current && serverDetailsRef.current.getBoundingClientRect().top < 0) {
      serverDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setSelectedServer(server);
  }

  return (
    <>
      {/* Header */}
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-2 text-black">Overview</h1>
        <div className="flex items-center gap-5 mb-4">
          <div className="text-lg text-black">
            Total Servers: <span className="font-semibold">15</span>
          </div>
          <div className="text-lg text-black">
            Online: <span className="font-semibold text-green-600">
              9
            </span>
          </div>
          <div className="text-lg text-black">
            Offline: <span className="font-semibold text-red-600">
              6
            </span>
          </div>
        </div>
      </div>

      <div className="w-full border-black border-b-1 my-4" />

      {/* Add Server Form */}
      {showAddFormToAddServer ? (
        <div className="max-w-md mb-2 p-2 border border-black">
          {/* <h3 className="text-lg font-semibold mb-4 text-black">Add New Server</h3> */}
          <div className="space-y-4">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full">
                <label className="block text-black font-medium mb-1">Server Name</label>
                <input
                  type="text"
                  value={formDataToAddServer.name}
                  onChange={(e) => setFormDataToAddServer({ ...formDataToAddServer, name: e.target.value })}
                  className="w-full px-3 py-2 border border-black text-black min-h-[2.5rem]"
                  placeholder="Enter server name"
                />
              </div>
              <div className="w-full">
                <label className="block text-black font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={formDataToAddServer.address}
                  onChange={(e) => setFormDataToAddServer({ ...formDataToAddServer, address: e.target.value })}
                  className="w-full px-3 py-2 border border-black text-black min-h-[2.5rem]"
                  placeholder="192.168.1.1 or www.example.com"
                />
              </div>
            </div>
            <div className="flex flex-row gap-1">
              <button
                onClick={handleAddServer}
                className="px-4 py-2 border border-black text-black hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Add Server
              </button>
              <button
                onClick={() => setShowAddFormToAddServer(false)}
                className="px-4 py-2 border border-black text-black hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-2">
          <button
            onClick={() => setShowAddFormToAddServer(true)}
            className="px-4 py-2 border border-black text-black hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Add Server
          </button>
        </div>
      )}

      <div className="w-full border-black border-b-1 my-4" />

      {/* Server Details */}
      <div ref={serverDetailsRef} className="@container w-full max-w-4xl">
        {selectedServer && (
          <div className="mb-2 p-2 border border-black relative">
            <h3 className="text-lg font-semibold mb-5 text-black">Server Details</h3>
            <div className="absolute right-1 top-1 cursor-pointer" onClick={() => setSelectedServer(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="max-w-4xl w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 mb-4">
              <div className="flex flex-row flex-wrap gap-1">
                <strong>Name:</strong>
                <span>{selectedServer.name}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-1">
                <strong>IP Address:</strong>
                <span>{selectedServer.address}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-1">
                <strong>Status:</strong>
                <span className={clsx(
                  selectedServer.isOnline ? 'text-green-600' : 'text-red-600',
                )}>
                  {selectedServer.isOnline ? ' Online' : ' Offline'}
                </span>
              </div>
              <div className="flex flex-row flex-wrap gap-1">
                <strong>Last Ping:</strong>
                <span>{formatTimestamp(selectedServer.lastPingTimestamp)}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-1">
                <strong>Registered:</strong>
                <span>{formatTimestamp(selectedServer.registeredTimestamp)}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-1">
                <strong>Account Required:</strong>
                <span>{selectedServer.accountRequired ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <div className="max-w-4xl w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 mb-4">
              <div className="flex flex-row flex-wrap gap-1">
                <strong>Capacity:</strong>
                <span>{formatBytes(selectedServer.capacity)}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-1">
                <strong>FreeSpace:</strong>
                <span>{formatBytes(selectedServer.freeSpace)}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-1">
                <strong>Usage:</strong>
                <span>{getUsagePercentage(selectedServer.capacity, selectedServer.freeSpace).toFixed(1)} %</span>
              </div>
            </div>
            <div className="pt-4">
              <div className="max-w-4xl w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 gap-y-1 mb-1">
                <button
                  onClick={() => openPanel('servers/user-storages')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  User Storages
                </button>
                <button
                  onClick={() => openPanel('servers/block-devices')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  Block Devices
                </button>
                <button
                  onClick={() => openPanel('servers/blobs')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  Blobs
                </button>
              </div>
              <div className="max-w-4xl w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 gap-y-1 mb-1">
                <button
                  onClick={() => openPanel('servers/uploads-downloads')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  Uploads & Downloads
                </button>
                <button
                  onClick={() => openPanel('servers/logging')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  Logging
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter Controls */}
      <div className="w-full mb-1 flex flex-row gap-2">
        <div className="w-fit">
          <select
            value={serverTableStatusFilter}
            onChange={(e) => setServerTableStatusFilter(e.target.value)}
            className="px-3 py-2 border border-black text-black"
          >
            <option value="all">All Status</option>
            <option value="online">Online Only</option>
            <option value="offline">Offline Only</option>
          </select>
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search servers by name or address"
            value={serverTableSearchTerm}
            onChange={(e) => setServerTableSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-black text-black"
          />
        </div>
      </div>

      {/* Server Summary Table */}
      <ResizableVerticalWrapper
        defaultLayoutHeight={defaultLayoutData.adminPage.serverManagementPanel.serverTable.height}
        layoutHeight={layoutData.adminPage.serverManagementPanel.serverTable.height}

        minHeight={77}

        className="mb-1"

        setLayoutHeight={(height: number) => setLayoutData((layoutData: LayoutData) => {
          layoutData.adminPage.serverManagementPanel.serverTable.height = height;
        })}
      >
        <table className="w-fit h-fit relative">
          <thead className="sticky top-0 bg-gray-200">
            <tr className="w-full">
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Name</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Address</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Last Ping</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Registered</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Account Req.</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Usage</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serverList && serverList.items.map((server: ServerData, index: number) => (
              <tr key={server.id} className={clsx(
                (index % 2 == 0) ? 'bg-white' : 'bg-gray-100'
              )}>
                <td className="px-4 py-3 whitespace-nowrap text-black">{server.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-black font-mono">{server.address}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={clsx(
                    "px-2 py-1 text-sm border",
                    server.isOnline ? 'bg-green-50 border-green-600 text-green-600' : 'bg-red-50 border-red-600 text-red-600'
                  )}>
                    {server.isOnline ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-black text-sm">
                  {formatTimestamp(server.lastPingTimestamp)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-black text-sm">
                  {formatTimestamp(server.registeredTimestamp)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-black">
                  {server.accountRequired ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-black">
                  <div className="ml-2 inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">
                      {getUsagePercentage(server.capacity, server.freeSpace).toFixed(1)}%
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openServerDetails(server)}
                      className="px-2 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => moveItemToFirst(server.id)}
                      className="px-0 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemoveServer(server.id)}
                      className="px-2 py-1 text-sm border border-red-600 text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ResizableVerticalWrapper>

      {serverList && (
        <Paginator currentPage={serverTableCurrentPage} totalPages={serverList.totalPages} onPageChange={setServerTableCurrentPage} maxVisiblePages={3} />
      )}

      <div className="mb-17"></div>

    </>
  );
}

export default OverviewPanel;
