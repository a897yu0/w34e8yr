interface AdminMainPanelProps {
  panelTopRef: React.RefObject<HTMLDivElement | null>;

  args?: string[];
  pathArgs?: string[];

  openPanel: (path: string) => void;
  resetPanel: () => void;
}

export type { AdminMainPanelProps };
