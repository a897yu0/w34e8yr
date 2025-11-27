import type { Layout } from "@/types/Layout";

const defaultLayout: Readonly<Layout> = {
  adminPage: {
    sidebar: {
      width: 277,
    },
    servers: {
      overviewPanel: {
        serverTable: {
          itemCountPerPage: 10,
          height: 177,
        },
      },
    },
  },
};

function loadLayout(): Layout | undefined {
  const strLayoutData: string | null = localStorage.getItem('layout');

  if (!strLayoutData) { return undefined; }

  return JSON.parse(strLayoutData) as Layout;
}

let timeout: NodeJS.Timeout | null = null;
let layout: Layout = loadLayout() || structuredClone(defaultLayout);

function setLayout(dispatch: (data: Layout) => void): void {
  dispatch(layout);

  if (!timeout) {
    timeout = setTimeout(() => {
      localStorage.setItem('layout', JSON.stringify(layout));
      timeout = null;
    }, 1000);
  }
}

export { defaultLayout, layout, setLayout };