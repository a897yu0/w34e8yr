// import clsx from "clsx";
import React from "react";

import type { Server } from "@/types/Server";
import type { ServerDetailsProps } from "@/types/props/ServerDetailsProps";
import {
  formatTimestamp,
  isWithinLastNMinutes,
} from "@/utils";


function ServerDetails(props: ServerDetailsProps): React.JSX.Element {
  props;

  const server: Server = props.server;

  const resetSelection: (() => void) | undefined = props.resetSelection;

  return (
    <div className="w-full relative">
      <h3 className="text-lg font-semibold mb-5 text-black">Server Details</h3>
      {resetSelection && (
        <div className="absolute right-0 top-0 cursor-pointer" onClick={() => resetSelection()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      )}
      <div className="w-full flex flex-col mb-4 bordre-black border-b-1">
        <div className="w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 mb-1">
          <div className="flex flex-row flex-wrap gap-1">
            <strong>Name:</strong>
            <span>{server.name}</span>
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            <strong>IP Address:</strong>
            <span>{server.address}</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mb-4 bordre-black border-b-1">
        <div className="w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 mb-1">
          <div className="flex flex-row flex-wrap gap-1">
            <strong>Status:</strong>
            {isWithinLastNMinutes(server.lastPing, 10) ? (
              <span className="text-green-600">Online</span>
            ) : (
              <span className="text-red-600">Offline</span>
            )}
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            <strong>Registered:</strong>
            <span>{formatTimestamp(server.registered)}</span>
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            <strong>Last Ping:</strong>
            <span>{formatTimestamp(server.lastPing)}</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mb-4 bordre-black border-b-1">
        <div className="w-full grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 mb-1">
          <div className="flex flex-row flex-wrap gap-1">
            <strong>Storages:</strong>
            <span>{server.storages.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerDetails;