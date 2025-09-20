import type { DialogContext } from "../DialogContext";

interface DialogProps {
  onClose: () => void;
  ctx: DialogContext;
}

export type { DialogProps };
