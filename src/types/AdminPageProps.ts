import type { DialogContext } from "./DialogContext";


interface AdminPageProps {
  openDialog: (ctx: DialogContext | null) => void;
}

export type { AdminPageProps };