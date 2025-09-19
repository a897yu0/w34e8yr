import clsx from 'clsx';
import React from 'react';

import type { MainPanelProps } from '@/types/MainPanelProps';
import sampleServerList from './sampleServerList';

interface Server {
  id: number;

  name: string;
  ipAddress: string;
  isOnline: boolean;
  lastPingTimestamp: Date;
  registeredTimestamp: Date;
  accountRequired: boolean;

  capacity: number;
  freeSpace: number;
}

interface ResizableVerticalWrapperProps {
  initHeight: number;
  minHeight: number;

  children: React.JSX.Element;

  localStorageKey?: string;
}

interface ServersManagementPanelProps extends MainPanelProps {
}

interface PaginatedServerList {
  items: Server[];

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

function moveServerItemToFirst(id: number) {

  const sortedServers = [...sampleServerList].sort((a, b) => b.id - a.id);

  sampleServerList.forEach((server: Server) => {
    if (server.id !== id) return;

    server.id = (sortedServers[0].id + 1);
  });

}

// Simple Circle Progress Component
interface CircleProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  className?: string;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  backgroundColor = '#e5e7eb',
  showPercentage = true,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColorInfo = (percentage: number) => {
    if (percentage < 50) return { color: '#10b981', label: 'Good', bg: 'bg-green-50' };
    if (percentage < 75) return { color: '#f59e0b', label: 'Fair', bg: 'bg-yellow-50' };
    if (percentage < 90) return { color: '#f97316', label: 'High', bg: 'bg-orange-50' };
    return { color: '#ef4444', label: 'Critical', bg: 'bg-red-50' };
  };

  const color = getColorInfo(percentage).color;

  return (
    <div className="relative flex flex-row">
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </div>
      {showPercentage && (
        <div className="ml-2 inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};
function ResizableVerticalWrapper(props: ResizableVerticalWrapperProps): React.JSX.Element {
  const initHeight: number = props.initHeight;
  const minHeight: number = props.minHeight;

  if (minHeight < 0) {
    throw new Error(`Minimum height (${minHeight}) cannot be negative`);
  }

  const children: React.JSX.Element = props.children;

  const localStorageKey: string | undefined = props.localStorageKey;

  const getInitialHeightInCorrectRange = (minHeight: number, height: number): number => {
    if (minHeight < 0) {
      throw new Error(`Minimum height (${minHeight}) cannot be negative`);
    }

    if (localStorageKey) {
      const item: string | null = localStorage.getItem(localStorageKey);

      if (item) {
        height = parseInt(item, 10);
      }

    }

    console.assert(minHeight >= 0);
    return Math.max(height, minHeight);
  }

  const saveInitialHeight = (height: number): void => {
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, height.toString());
    }
  }

  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const tableResizerRef = React.useRef<HTMLDivElement>(null);

  // const initHeight: number = 177;
  // const minHeight: number = 77;

  const [resizableTableHeight, setResizableTableHeight] = React.useState<number>(getInitialHeightInCorrectRange(minHeight, initHeight));
  const [isResizableTableDragging, setIsResizableTableDragging] = React.useState<boolean>(false);

  const handleTableResizerPointerDown = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Don't preventDefault here for touch events
    if ('touches' in e) {
      // Just start dragging, preventDefault will happen in touchmove
    } else {
      e.preventDefault(); // Only prevent for mouse events
    }

    setIsResizableTableDragging(true);
  }, []);

  const handleTableResizerPointerMove = React.useCallback((e: MouseEvent | TouchEvent) => {
    if (!isResizableTableDragging || !tableContainerRef.current) {
      return;
    }

    // Prevent default behavior and stop event propagation
    e.preventDefault();
    e.stopPropagation();

    const containerRect = tableContainerRef.current.getBoundingClientRect();

    // Get Y position from either mouse or touch event
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    if (clientY === undefined) {
      return;
    }

    console.assert(containerRect.top <= clientY);
    const height = (clientY - containerRect.top);

    console.assert(minHeight >= 0);
    const newHeight = Math.max(height, minHeight);

    setResizableTableHeight(newHeight);
    saveInitialHeight(newHeight);

  }, [isResizableTableDragging, minHeight]);

  const handleTableResizerPointerUp = React.useCallback(() => {
    setIsResizableTableDragging(false);
  }, []);

  const handleManualExpansion = () => {
    setResizableTableHeight((prevHeight: number) => {
      const newHeight: number = (prevHeight + 77);

      console.assert(newHeight >= 0);
      saveInitialHeight(newHeight);
      return newHeight;
    });
  };

  const handleManualReduction = () => {
    setResizableTableHeight((prevHeight: number) => {
      console.assert(minHeight >= 0);
      const newHeight: number = Math.max(prevHeight - 77, minHeight);

      console.assert(newHeight >= 0);
      saveInitialHeight(newHeight);
      return newHeight;
    });
  };

  // Resizable sidebar handlers
  React.useEffect(() => {
    if (isResizableTableDragging) {
      document.addEventListener('mousemove', handleTableResizerPointerMove);
      document.addEventListener('mouseup', handleTableResizerPointerUp);
      document.addEventListener('touchmove', handleTableResizerPointerMove, { passive: false });
      document.addEventListener('touchend', handleTableResizerPointerUp);

      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
      document.body.style.touchAction = 'none'; // Prevent scrolling on mobile
    }

    return () => {
      document.removeEventListener('mousemove', handleTableResizerPointerMove);
      document.removeEventListener('mouseup', handleTableResizerPointerUp);
      document.removeEventListener('touchmove', handleTableResizerPointerMove);
      document.removeEventListener('touchend', handleTableResizerPointerUp);

      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
    };
  }, [isResizableTableDragging, handleTableResizerPointerMove, handleTableResizerPointerUp]);

  return (
    <div className="w-full h-fit flex flex-col justify-between items-center">
      <div
        ref={tableContainerRef}
        className="w-full overflow-auto border border-black relative"
        style={{
          height: `${resizableTableHeight}px`
        }}
      >
        <div className="absolute w-fit h-fit">
          {children}
        </div>
      </div>

      <div
        ref={tableResizerRef}
        className={clsx(
          "w-full h-1 cursor-row-resize ",
          isResizableTableDragging ? 'bg-blue-500' : 'bg-gray-400',
        )}
        onMouseDown={handleTableResizerPointerDown}
        onTouchStart={handleTableResizerPointerDown}
      >
      </div>

      <div className="w-full h-7 flex flex-row justify-end items-center gap-1">
        <div className="h-full aspect-square cursor-pointer" onClick={() => handleManualReduction()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </div>
        <div className="h-full aspect-square cursor-pointer" onClick={() => handleManualExpansion()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

    </div>
  );
}

/**
 * Features:
 * Current server count
 * Add/Remove servers with name, IP address
 * Server table (Search, Pagination, Filter) with name, IP address, online status, last ping-pong timestamp, registered timestamp, detail, Account required in server
 */
function ServersManagementPanel(props: ServersManagementPanelProps): React.JSX.Element {

  props;

  // State for table controls
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState<number>(7);
  const [selectedServer, setSelectedServer] = React.useState<Server | null>(null);

  setPageSize;

  // Mock server data
  // The order is pre-sorted when this list get from DB. and the pagination is handled by partially, not paginated at the client.
  const [serverList, setServerList] = React.useState<PaginatedServerList | undefined>(undefined);

  // State for form
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    ipAddress: '',
    accountRequired: false
  });

  // Add server
  const handleAddServer = () => {
    // if (formData.name && formData.ipAddress) {
    //   const newServer = {
    //     id: serverList.length + 1,
    //     name: formData.name,
    //     ipAddress: formData.ipAddress,
    //     isOnline: Math.random() > 0.5, // Random online status
    //     lastPingTimestamp: new Date(),
    //     registeredTimestamp: new Date(),
    //     accountRequired: formData.accountRequired
    //   };
    //   setServerList([...serverList, newServer]);
    //   setFormData({ name: '', ipAddress: '', accountRequired: false });
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

    setServerList(getPaginatedServerList(currentPage, pageSize));
  };

  // Filter and search servers, The filter is handled by DB and query, not in client...
  // const filteredServers = React.useMemo(() => {
  //   return servers.filter(server => {
  //     const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       server.ipAddress.includes(searchTerm);
  //     const matchesStatus = statusFilter === 'all' ||
  //       (statusFilter === 'online' && server.isOnline) ||
  //       (statusFilter === 'offline' && !server.isOnline);
  //     return matchesSearch && matchesStatus;
  //   });
  // }, [servers, searchTerm, statusFilter]);

  React.useEffect(() => {
    setServerList(getPaginatedServerList(currentPage, pageSize));
  }, [currentPage, pageSize])

  return (
    <>
      {/* Header */}
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-2 text-black">Servers Management</h1>
        <div className="flex items-center gap-1 mb-4">
          <div className="text-lg text-black border border-black p-1">
            Total Servers: <span className="font-semibold">15</span>
          </div>
          <div className="text-lg text-black border border-black p-1">
            Online: <span className="font-semibold text-green-600">
              9
            </span>
          </div>
          <div className="text-lg text-black border border-black p-1">
            Offline: <span className="font-semibold text-red-600">
              6
            </span>
          </div>
        </div>
      </div>

      <div className="w-full border-black border-b-1 my-4" />

      {/* Add Server Button */}
      <div className="mb-2">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 border border-black text-black hover:bg-gray-50 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Server'}
        </button>
      </div>

      {/* Add Server Form */}
      {showAddForm && (
        <div className="mb-2 p-2 border border-black">
          <h3 className="text-lg font-semibold mb-4 text-black">Add New Server</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block text-black font-medium mb-1">Server Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-black text-black"
                  placeholder="Enter server name"
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">IP Address</label>
                <input
                  type="text"
                  value={formData.ipAddress}
                  onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-black text-black"
                  placeholder="192.168.1.1"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="accountRequired"
                checked={formData.accountRequired}
                onChange={(e) => setFormData({ ...formData, accountRequired: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="accountRequired" className="text-black">
                Account Required
              </label>
            </div>
            <button
              onClick={handleAddServer}
              className="px-4 py-2 border border-black text-black hover:bg-gray-50 transition-colors"
            >
              Add Server
            </button>
          </div>
        </div>
      )}

      <div className="w-full border-black border-b-1 my-4" />

      {/* Server Details */}
      {selectedServer && (
        <div className="w-full max-w-4xl mb-2 p-2 border border-black relative">
          <h3 className="text-lg font-semibold mb-3 text-black">Server Details</h3>
          <div className="absolute right-1 top-1 cursor-pointer" onClick={() => setSelectedServer(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <strong className="text-black">ID:</strong> {selectedServer.id}
            </div>
          </div>
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <strong className="text-black">Name:</strong> {selectedServer.name}
            </div>
            <div>
              <strong className="text-black">IP Address:</strong> {selectedServer.ipAddress}
            </div>
            <div>
              <strong className="text-black">Status:</strong>
              <span className={selectedServer.isOnline ? 'text-green-600' : 'text-red-600'}>
                {selectedServer.isOnline ? ' Online' : ' Offline'}
              </span>
            </div>
            <div>
              <strong className="text-black">Last Ping:</strong> {formatTimestamp(selectedServer.lastPingTimestamp)}
            </div>
            <div>
              <strong className="text-black">Registered:</strong> {formatTimestamp(selectedServer.registeredTimestamp)}
            </div>
            <div>
              <strong className="text-black">Account Required:</strong> {selectedServer.accountRequired ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <strong className="text-black">Capacity:</strong> {formatBytes(selectedServer.capacity)}
            </div>
            <div>
              <strong className="text-black">FreeSpace:</strong> {formatBytes(selectedServer.freeSpace)}
            </div>
            <div>
              <strong className="text-black">FreeSpace:</strong> {(((selectedServer.capacity - selectedServer.freeSpace) / selectedServer.capacity) * 100).toFixed(1)} %
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="w-full mb-2 flex flex-col gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search servers by name or IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-black text-black"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-black text-black"
          >
            <option value="all">All Status</option>
            <option value="online">Online Only</option>
            <option value="offline">Offline Only</option>
          </select>
        </div>
      </div>

      {/* Servers Table */}
      <ResizableVerticalWrapper
        initHeight={177} minHeight={77}
        localStorageKey="6698a24e-4233-473a-b0a1-1b3bd697e94a"
      >
        <table className="w-fit h-fit border-r-1 border-black ">
          <thead>
            <tr className="border-b border-black">
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Name</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">IP Address</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Last Ping</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Registered</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Account Req.</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Usage</th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-black font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serverList && serverList.items.map((server: Server) => (
              <tr key={server.id} className="border-b border-black ">
                <td className="px-4 py-3 whitespace-nowrap text-black">{server.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-black font-mono">{server.ipAddress}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-sm border ${server.isOnline
                    ? 'bg-green-50 border-green-600 text-green-600'
                    : 'bg-red-50 border-red-600 text-red-600'
                    }`}>
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
                  <CircleProgress
                    percentage={((server.capacity - server.freeSpace) / server.capacity) * 100}
                    size={28}
                    strokeWidth={28 * 0.09}
                    backgroundColor="#f3f4f6"
                    showPercentage={true}
                  />
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedServer(server)}
                      className="px-2 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleRemoveServer(server.id)}
                      className="px-2 py-1 text-sm border border-red-600 text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => moveItemToFirst(server.id)}
                      className="px-2 py-1 text-sm border border-black text-black hover:bg-gray-50 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ResizableVerticalWrapper>

      {/* Pagination */}
      {serverList && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1 border border-black text-black hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex gap-1">
            {Array.from({ length: serverList.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border border-black  cursor-pointer ${currentPage === page
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-50'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(serverList.totalPages, currentPage + 1))}
            disabled={currentPage === serverList.totalPages}
            className="p-1 border border-black text-black hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

    </>
  );
}

export default ServersManagementPanel;

