import type { DialogContext } from "../DialogContext";
import type { PageProps } from "./PageProps";

interface InnerPageProps extends PageProps {
  openDialog: (ctx: DialogContext | null) => void;
}

export type { InnerPageProps };