import clsx from 'clsx';
import React from 'react';

import type { AdminMainPanelProps } from '@/types/props/admin/AdminMainPanelProps';
import type { Server } from '@/types/Server';

import ResizableVerticalWrapper from '@/components/ResizableVerticalWrapper';
import Paginator from '@/components/Paginator';
import ServerDetails from '@/components/ServerDetails';

import type { User } from '@/types/User';
import { useUser } from '@/user';

import type { LayoutData } from '@/types/LayoutData';
import { defaultLayoutData, layoutData, setLayoutData } from '@/layout-data';

import { formatTimestamp, getUsagePercentage } from '@/utils';

interface PaginatedServerList {
  items: Server[];

  currentPageIndex: number;
  totalPageCount: number;

}

function paginateServerList(serverList: Server[], pageIndex: number, itemCountPerPage: number = 3): PaginatedServerList {
  if (pageIndex < 0) {
    throw new Error(`Invalid page index: ${pageIndex} < 0`);
  }
  if (itemCountPerPage <= 0) {
    throw new Error(`Invalid page size: ${itemCountPerPage} <= 0`);
  };

  const totalItems = serverList.length;
  if (totalItems === 0) {
    return {
      items: [],

      currentPageIndex: 0,
      totalPageCount: 0,
    };
  }

  const totalPageCount = Math.ceil(totalItems / itemCountPerPage);

  // Ensure page is within valid range
  const currentPageIndex = Math.max(0, Math.min(pageIndex, totalPageCount));

  // Calculate start and end indices
  const startIndex = (currentPageIndex * itemCountPerPage);
  const endIndex = (startIndex + itemCountPerPage);

  return {
    items: serverList.slice(startIndex, endIndex),

    currentPageIndex: currentPageIndex,
    totalPageCount: totalPageCount,
  };
}

/**
 * Features:
 * Current server count
 * Add/Remove servers with name, Server address
 * Server table (Search, Pagination, Filter) with name, Server address, online status, last ping-pong timestamp, registered timestamp, detail, Account required in server
 */
function OverviewPanel(props: AdminMainPanelProps): React.JSX.Element {
  props;

  const panelTopRef: React.RefObject<HTMLDivElement | null> = props.panelTopRef;

  const openPanel: (path: string) => void = props.openPanel;

  const [user, setUser] = useUser();
  user as User;
  setUser;

  const serverDetailsRef = React.useRef<HTMLDivElement>(null);

  // State for table controls
  const [serverTableSearchTerm, setServerTableSearchTerm] = React.useState('');
  const [serverTableStatusFilter, setServerTableStatusFilter] = React.useState('all');
  const [serverTableCurrentPageIndex, setServerTableCurrentPageIndex] = React.useState(0);
  const [serverTableItemCountPerPage, setServerTableItemCountPerPage] = React.useState<number>(layoutData.adminPage.servers.overviewPanel.serverTable.itemCountPerPage);
  const [isServerDetailsShown, setIsServerDetailsShown] = React.useState<boolean>(false);

  // Mock server data
  // The order is pre-sorted when this list get from DB. and the pagination is handled by partially, not paginated at the client.
  const paginatedServerList: PaginatedServerList = React.useMemo<PaginatedServerList>(() => {
    // console.log("user.serverList:", user.serverList);
    // console.log("serverTableCurrentPage:", serverTableCurrentPageIndex);
    return paginateServerList(user.serverList, serverTableCurrentPageIndex, serverTableItemCountPerPage);
  }, [user, serverTableCurrentPageIndex, serverTableItemCountPerPage]);

  // State for form
  const [showAddFormToAddServer, setShowAddFormToAddServer] = React.useState(false);
  const [formDataToAddServer, setFormDataToAddServer] = React.useState({
    name: '',
    address: '',
    // protocol: '',
    // port: '',
    // accountRequired: false,
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
  const handleRemoveServer = (index: number) => {
    console.assert(index >= 0);
    console.assert(index < user.serverList.length);
    console.assert(Number.isInteger(index));

    // setServerList(serverList.filter(server => server.id !== id));
    // setSelectedServer(null);
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

  const openServerDetails = (index: number) => {
    console.assert(index >= 0);
    console.assert(index < user.serverList.length);
    console.assert(Number.isInteger(index));

    // console.log("index:", index);

    setUser((user: User) => {
      const server: Server = user.serverList.splice(index, 1)[0];
      user.serverList.unshift(server);

      if (user.serverList.length > 0) {
        setIsServerDetailsShown(true);

        setTimeout(() => {
          if (serverDetailsRef.current && panelTopRef.current) {
            // console.log("panelTopRef y:", panelTopRef.current.getBoundingClientRect().y);
            // console.log("serverDetailsRef y:", serverDetailsRef.current.getBoundingClientRect().y);
            if (serverDetailsRef.current.getBoundingClientRect().y < panelTopRef.current.getBoundingClientRect().y) {
              serverDetailsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',  // Vertical Alignment
                inline: 'start',  // Horizontal Alignment
              });
            }
          }
        }, 1);
      }
    });

  };

  const changeServerTableItemCountPerPage = (itemCountPerPage: number) => {
    console.assert(itemCountPerPage > 0);
    console.assert(Number.isInteger(itemCountPerPage));

    setLayoutData((data: LayoutData) => {
      data.adminPage.servers.overviewPanel.serverTable.itemCountPerPage = itemCountPerPage;
    })

    setServerTableItemCountPerPage(itemCountPerPage);
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
        <div className="max-w-md mb-2 p-2 border-1 border-black">
          {/* <h3 className="text-lg font-semibold mb-4 text-black">Add New Server</h3> */}
          <div className="space-y-4">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full">
                <label className="block text-black font-medium mb-1">Server Name</label>
                <input
                  type="text"
                  value={formDataToAddServer.name}
                  onChange={(e) => setFormDataToAddServer({ ...formDataToAddServer, name: e.target.value })}
                  className="w-full px-3 py-2 border-1 border-black text-black min-h-[2.5rem]"
                  placeholder="Enter server name"
                />
              </div>
              <div className="w-full">
                <label className="block text-black font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={formDataToAddServer.address}
                  onChange={(e) => setFormDataToAddServer({ ...formDataToAddServer, address: e.target.value })}
                  className="w-full px-3 py-2 border-1 border-black text-black min-h-[2.5rem]"
                  placeholder="192.168.1.1 or www.example.com"
                />
              </div>
            </div>
            <div className="flex flex-row gap-1">
              <button
                onClick={handleAddServer}
                className="px-4 py-2 border-1 border-black text-black hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Add Server
              </button>
              <button
                onClick={() => setShowAddFormToAddServer(false)}
                className="px-4 py-2 border-1 border-black text-black hover:bg-gray-50 transition-colors cursor-pointer"
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
            className="px-4 py-2 border-1 border-black text-black hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Add Server
          </button>
        </div>
      )}

      <div className="w-full border-black border-b-1 my-4" />

      {/* Search and Filter Controls */}
      <div className="w-full mb-2 flex flex-row gap-2">
        <div className="w-fit">
          <select
            value={serverTableStatusFilter}
            onChange={(e) => setServerTableStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border-1 border-black text-black"
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
            className="w-full px-3 py-2 border-1 border-black text-black"
          />
        </div>
      </div>

      {/* Server Details */}
      {isServerDetailsShown && (user.serverList.length > 0) && (
        <div ref={serverDetailsRef} className="@container w-full max-w-4xl mb-2 ">
          <div className="p-2 border-1 border-black relative">
            <ServerDetails server={user.serverList[0]} resetSelection={() => setIsServerDetailsShown(false)} />
            <div className="pt-4">
              <div className="w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 gap-y-1 mb-1">
                <button
                  onClick={() => openPanel('servers/user-storages')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border-1 border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  User Storages
                </button>
                <button
                  onClick={() => openPanel('servers/block-devices')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border-1 border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  Block Devices
                </button>
                <button
                  onClick={() => openPanel('servers/blobs')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border-1 border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  Blobs
                </button>
              </div>
              <div className="w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 gap-y-1 mb-1">
                <button
                  onClick={() => openPanel('servers/uploads-downloads')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border-1 border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  Uploads & Downloads
                </button>
                <button
                  onClick={() => openPanel('servers/logging')}
                  className="flex flex-row gap-1 justify-start items-center px-2 py-1 text-sm border-1 border-black text-black hover:bg-gray-50 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                  Logging
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Server Summary Table */}
      <ResizableVerticalWrapper
        layoutHeight={layoutData.adminPage.servers.overviewPanel.serverTable.height}
        defaultLayoutHeight={defaultLayoutData.adminPage.servers.overviewPanel.serverTable.height}

        minHeight={77}

        className="mb-1"

        setLayoutHeight={(height: number) => setLayoutData((layoutData: LayoutData) => {
          layoutData.adminPage.servers.overviewPanel.serverTable.height = height;
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
            {paginatedServerList && paginatedServerList.items.map((server: Server, index: number) => (
              <tr key={index} className={clsx(
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
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => openServerDetails((paginatedServerList.currentPageIndex * serverTableItemCountPerPage) + index)}
                      className="px-2 py-1 text-sm border-1 border-black text-black hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex flex-row justify-center items-center gap-1">
                        Details
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                        </svg>
                      </div>
                    </button>
                    <button
                      onClick={() => handleRemoveServer(index)}
                      className="px-2 py-1 text-sm border-1 border-red-600 text-red-600 hover:bg-red-50 cursor-pointer"
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

      <div className="w-full flex felx-row gap-3 justify-end items-center">
        <select
          value={serverTableItemCountPerPage}
          onChange={(e) => changeServerTableItemCountPerPage(parseInt(e.target.value, 10))}
          className="w-17 px-3 py-2 border-1 border-black text-black"
        >
          {Array.from({ length: 10 }, (_, i) => (i + 1) * defaultLayoutData.adminPage.servers.overviewPanel.serverTable.itemCountPerPage).map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {paginatedServerList && (
          <Paginator
            currentPageIndex={serverTableCurrentPageIndex}
            totalPageCount={paginatedServerList.totalPageCount}
            maxVisiblePageCount={3}

            onPageChange={setServerTableCurrentPageIndex} />
        )}

      </div>

      <div className="mb-17"></div>

    </>
  );
}

export default OverviewPanel;
