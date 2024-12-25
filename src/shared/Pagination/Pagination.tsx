"use client";

import React, { FC } from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // console.log("total pages", totalPages);
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${
            currentPage === i
              ? "bg-primary-6000 text-white"
              : "bg-white text-gray-900 border"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex space-x-2">
      {totalPages !== 1 && (
        <>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white text-gray-900 border disabled:opacity-50"
          >
            Prev
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white text-gray-900 border disabled:opacity-50"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
