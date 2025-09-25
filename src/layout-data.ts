import type { LayoutData } from "./types/LayoutData";
import { getValidPositiveIntegerOrDefault, getValidPositiveNumberOrDefault } from "./validators";

const defaultLayoutData: Readonly<LayoutData> = {
  adminPage: {
    sidebar: {
      width: 277,  // TODO: Make configurable with .env
    },
    servers: {
      overviewPanel: {
        serverTable: {
          itemCountPerPage: 5,
          height: 177,  // TODO: Make configurable with .env
        },
      },
    },
  },
};

function loadLayoutData(): LayoutData | undefined {
  const strLayoutData: string | null = localStorage.getItem('layout');

  if (!strLayoutData) {
    return undefined;
  }

  const unknownLayoutData: any = JSON.parse(strLayoutData);

  return {
    adminPage: {
      sidebar: {
        width: getValidPositiveNumberOrDefault(
          unknownLayoutData?.adminPage?.sidebar?.width,
          defaultLayoutData.adminPage.sidebar.width,
        ),
      },
      servers: {
        overviewPanel: {
          serverTable: {
            itemCountPerPage: getValidPositiveIntegerOrDefault(
              unknownLayoutData?.adminPage?.servers?.overviewPanel?.serverTable?.itemCountPerPage,
              defaultLayoutData.adminPage.servers.overviewPanel.serverTable.itemCountPerPage,
            ),
            height: getValidPositiveNumberOrDefault(
              unknownLayoutData?.adminPage?.servers?.overviewPanel?.serverTable?.height,
              defaultLayoutData.adminPage.servers.overviewPanel.serverTable.height,
            ),
          },
        },
      },
    },
  };
}

let timeout: NodeJS.Timeout | null = null;
let layoutData: LayoutData = loadLayoutData() || structuredClone(defaultLayoutData);

function saveLayoutData(data: LayoutData): void {
  localStorage.setItem('layout', JSON.stringify(data));
}

function setLayoutData(dispatch: (data: LayoutData) => void): void {
  dispatch(layoutData);

  if (!timeout) {
    timeout = setTimeout(() => {
      saveLayoutData(layoutData);
      timeout = null;
    }, 1000);
  }
}

export { defaultLayoutData, layoutData, saveLayoutData, setLayoutData };
