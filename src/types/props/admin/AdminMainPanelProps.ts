interface AdminMainPanelProps {
  args?: string[];
  pathArgs?: string[];

  openPanel: (path: string) => void;
  resetPanel: () => void;
}

export type { AdminMainPanelProps };
