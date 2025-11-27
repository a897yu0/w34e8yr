
interface Layout {
  adminPage: {
    sidebar: {
      width: number;
    };
    servers: {
      overviewPanel: {
        serverTable: {
          itemCountPerPage: number;
          height: number;
        };
      };
    };
  };
}

export type { Layout };
