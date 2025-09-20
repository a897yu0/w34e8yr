interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;

  onPageChange: (page: number) => void;
}

export type { PaginatorProps };
