import type { DialogContext } from "@/types/DialogContext";
import type { PageProps } from "@/types/props/pages/PageProps";

interface InnerPageProps extends PageProps {
  openDialog: (ctx: DialogContext | null) => void;
}

export type { InnerPageProps };