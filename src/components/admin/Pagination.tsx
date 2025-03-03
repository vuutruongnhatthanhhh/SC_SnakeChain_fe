"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 4;
      }

      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
      <div className="flex items-center text-sm text-gray-600">
        {onPageSizeChange && (
          <div className="mr-4">
            <label className="mr-2">Hiển thị:</label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          Trang {currentPage} / {totalPages}
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-l border border-gray-300 ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          aria-label="Previous page"
        >
          <FiChevronLeft />
        </button>

        <div className="flex">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`w-9 h-10 border-t border-b border-gray-300 ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : page === "..."
                  ? "bg-white text-gray-500"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-r border border-gray-300 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          aria-label="Next page"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
