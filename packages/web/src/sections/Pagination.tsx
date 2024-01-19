import React, { useState } from 'react';
import { IPaginationProps } from '@csnvt/types';

const Pagination: React.FC<IPaginationProps> = ({
  page,
  count,
  onChange,
}) => {
  let items = [];
  let maxPages = count;
  const [currentPage, setCurrentPage] = useState(page);

  let leftSide = currentPage - count;
  if (leftSide <= 0) {
    leftSide = 1;
  }

  let rightSide = currentPage + count;
  if (rightSide > maxPages) {
    rightSide = maxPages;
  }

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <li
        key={number}
        className={`page-item${
          currentPage === number ? ' active' : ''
        }`}
      >
        <a
          className="page-link cursor-pointer"
          onClick={() => {
            setCurrentPage(number);
            onChange(number);
          }}
        >
          {number}
        </a>
      </li>,
    );
  }

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
      onChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onChange(currentPage - 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className="page-item">
          <a
            onClick={() => prevPage()}
            className="page-link cursor-pointer"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {items}
        <li className="page-item">
          <a
            onClick={() => nextPage()}
            className="page-link cursor-pointer"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
