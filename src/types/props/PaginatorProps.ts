interface PaginatorProps {
  currentPageIndex: number;
  totalPageCount: number;
  maxVisiblePageCount?: number;

  onPageChange: (index: number) => void;
}

export type { PaginatorProps };
