import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Pagination.css";

const Pagination = ({ pages, currentPage, route, siblingsCount = 1 }) => {
  const navigate = useNavigate();

  const [pagesToDisplay, setPagesToDisplay] = useState([]);

  // 5 here represents first page + last page + 2 Dots + current page
  const maximumPageNumInRow = siblingsCount + 5;
  const DOTS = "...";

  const getRangeArr = (start, end) => {
    const arrLength = end - start + 1;
    return Array.from({ length: arrLength }, (_, idx) => start + idx);
  };

  const onClickPage = (e) => {
    navigate(`${route}${Number(e.target.innerText)}`);
  };

  const onClickNextPage = (e) => {
    navigate(`${route}${currentPage + 1}`);
  };

  const onClickPreviousPage = (e) => {
    navigate(`${route}${currentPage - 1}`);
  };

  const isActive = (pageNum) => {
    if (currentPage === Number(pageNum)) return "current-page__active";
    else return "";
  };

  useMemo(() => {
    // Case 1
    if (pages <= maximumPageNumInRow) {
      console.log("Case 1");
      setPagesToDisplay(getRangeArr(1, pages));
      return;
    }

    const leftSiblingStartIndex = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingEndIndex = Math.min(currentPage + siblingsCount, pages);

    const isShowLeftDots = leftSiblingStartIndex > 2 + 1;
    const isShowRightDots = rightSiblingEndIndex < pages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = pages;

    // Case 2
    if (!isShowLeftDots && isShowRightDots) {
      console.log("Case 2");
      setPagesToDisplay([
        ...getRangeArr(firstPageIndex, maximumPageNumInRow - siblingsCount),
        DOTS,
        lastPageIndex,
      ]);
      return;
    }

    // case 3
    if (!isShowRightDots && isShowLeftDots) {
      console.log("Case 3");
      setPagesToDisplay([
        firstPageIndex,
        DOTS,
        ...getRangeArr(
          lastPageIndex - maximumPageNumInRow + siblingsCount + 1,
          lastPageIndex
        ),
      ]);
      return;
    }

    // case 4
    if (isShowLeftDots && isShowRightDots) {
      console.log("Case 4");
      setPagesToDisplay([
        firstPageIndex,
        DOTS,
        ...getRangeArr(leftSiblingStartIndex, rightSiblingEndIndex),
        DOTS,
        lastPageIndex,
      ]);
      return;
    }

    return () => {
      setPagesToDisplay([]);
    };
  }, [pages, currentPage, siblingsCount]);

  return (
    <article className="pagination-container">
      <button
        onClick={onClickPreviousPage}
        className="pagination__previous-page"
        disabled={currentPage === 1}
      >
        &#171;
      </button>

      <ul className="pagination-list">
        {pagesToDisplay.map((pageNum, idx) =>
          pageNum === DOTS ? (
            <li key={`key__dot__${idx}`} className="pagination-page-dot">
              &#8230;
            </li>
          ) : (
            <li
              key={`key__${pageNum}`}
              className={`pagination-page-number ${isActive(pageNum)}`}
              onClick={onClickPage}
            >
              {pageNum}
            </li>
          )
        )}
      </ul>

      <button
        className="pagination__next-page"
        disabled={currentPage === pages}
        onClick={onClickNextPage}
      >
        &#187;
      </button>
    </article>
  );
};

export default Pagination;
