import type React from "react";

import type { PaginatorProps } from "@/types/props/PaginatorProps";

function Paginator(props: PaginatorProps): React.JSX.Element {
  const currentPageIndex: number = props.currentPageIndex;
  const totalPageCount: number = props.totalPageCount;
  const maxVisiblePageCount: number = (props.maxVisiblePageCount || 3);

  // console.log("currentPage:", currentPage);
  // console.log("totalPages:", totalPages);

  const onPageChange: (index: number) => void = props.onPageChange;

  // Calculate which pages to show
  const getVisiblePages = () => {
    if (totalPageCount <= maxVisiblePageCount) {
      // If total pages is less than max, show all pages
      return Array.from({ length: (totalPageCount - 1) }, (_, i) => i);
    }

    // console.log("currentPage:", currentPageIndex);

    const halfVisible = Math.floor(maxVisiblePageCount / 2);
    let startPage: number = Math.max(0, (currentPageIndex - halfVisible));
    let endPage: number = Math.min(totalPageCount - 1, (startPage + maxVisiblePageCount - 1));

    // console.log("halfVisible:", halfVisible);
    // console.log("startPage:", startPage);
    // console.log("endPage:", endPage);

    // Adjust start page if we're near the end
    if ((endPage - startPage + 1) < maxVisiblePageCount) {
      startPage = Math.max(0, (endPage - maxVisiblePageCount + 1));
    }

    // console.log("startPage(2):", startPage);
    // console.log("endPage(2):", endPage);

    return Array.from({ length: (endPage - startPage + 1) }, (_, i) => (startPage + i));
  };

  const visiblePages = getVisiblePages();
  const showFirstPage = (visiblePages[0] > 0);
  const showLastPage = visiblePages[visiblePages.length - 1] < (totalPageCount - 1);
  const showStartEllipsis = (visiblePages[0] > 1);
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < (totalPageCount - 2);

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(0, currentPageIndex - 1))}
        disabled={currentPageIndex === 0}
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
              onClick={() => onPageChange(0)}
              className={`px-3 py-1 border border-black cursor-pointer ${currentPageIndex === 0
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-50'
                }`}
            >
              0
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
            className={`px-3 py-1 border border-black cursor-pointer ${currentPageIndex === page
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
              onClick={() => onPageChange((totalPageCount - 1))}
              className={`px-3 py-1 border border-black cursor-pointer ${currentPageIndex === (totalPageCount - 1)
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-50'
                }`}
            >
              {totalPageCount - 1}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPageCount, currentPageIndex + 1))}
        disabled={currentPageIndex === (totalPageCount - 1)}
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
