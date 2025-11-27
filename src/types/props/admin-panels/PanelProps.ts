import type { DialogContext } from "@/types/DialogContext";

interface PanelProps {
  openDialog: (ctx: DialogContext | null) => void;
}

export type { PanelProps };
