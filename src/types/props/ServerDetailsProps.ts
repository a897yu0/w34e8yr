import type { ServerData } from "@/types/data/ServerData";

interface ServerDetailsProps {
  server: ServerData;

  resetSelection?: () => void;
}

export type { ServerDetailsProps };
