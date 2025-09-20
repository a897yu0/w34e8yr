import type React from "react";

import type { PaginatorProps } from "@/types/props/PaginatorProps";

function Paginator(props: PaginatorProps): React.JSX.Element {
  const currentPage: number = props.currentPage;
  const totalPages: number = props.totalPages;
  const maxVisiblePages: number = props.maxVisiblePages || 3;

  const onPageChange: (page: number) => void = props.onPageChange;

  // Calculate which pages to show
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      // If total pages is less than max, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const visiblePages = getVisiblePages();
  const showFirstPage = visiblePages[0] > 1;
  const showLastPage = visiblePages[visiblePages.length - 1] < totalPages;
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-1 border border-black text-black hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="flex gap-1">
        {/* First page */}
        {showFirstPage && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`px-3 py-1 border border-black cursor-pointer ${currentPage === 1
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-50'
                }`}
            >
              1
            </button>
            {showStartEllipsis && (
              <span className="px-3 py-1 text-gray-500">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {visiblePages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border border-black cursor-pointer ${currentPage === page
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-50'
              }`}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {showLastPage && (
          <>
            {showEndEllipsis && (
              <span className="px-3 py-1 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-3 py-1 border border-black cursor-pointer ${currentPage === totalPages
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-50'
                }`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-1 border border-black text-black hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

export default Paginator;
