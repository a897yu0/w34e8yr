import type { DialogContext } from "@/types/DialogContext";

interface DialogProps {
  onClose: () => void;
  ctx: DialogContext;
}

export type { DialogProps };
