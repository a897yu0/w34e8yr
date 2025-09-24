import type { Server } from "@/types/Server";

interface ServerDetailsProps {
  server: Server;

  resetSelection?: () => void;
}

export type { ServerDetailsProps };
