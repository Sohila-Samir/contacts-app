import { useMemo, useState } from "react";

const usePagination = (currentPage, numberOfPages, siblingsCount) => {
  const [paginationRange, setPaginationRange] = useState([]);
  // 5 represents: (first page + last page + the TWO DOTS + current page)
  const rangeLimitInRow = 5 + siblingsCount;
  const DOTS = "...";

  const getRange = (start, end) => {
    const rangeLength = end - start + 1;
    return Array.from({ length: rangeLength }, (_, idx) => start + idx);
  };

  useMemo(() => {
    if (numberOfPages <= rangeLimitInRow) {
      setPaginationRange(getRange(1, numberOfPages));
      return;
    }

    const leftSiblingStartIndex = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingEndIndex = Math.min(
      currentPage + siblingsCount,
      numberOfPages
    );

    const isShowLeftDots = leftSiblingStartIndex > 2;
    const isShowRightDots = rightSiblingEndIndex < numberOfPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = numberOfPages;

    // Case 2
    if (!isShowLeftDots && isShowRightDots) {
      const leftRangeLimit = 2 * siblingsCount + 3;

      const leftRange = getRange(1, leftRangeLimit);

      setPaginationRange([...leftRange, DOTS, lastPageIndex]);

      return;
    }

    // case 3
    if (isShowLeftDots && !isShowRightDots) {
      const rightRangeLimit = 2 * siblingsCount + 3;

      const rightRange = getRange(
        numberOfPages - rightRangeLimit + 1,
        numberOfPages
      );

      setPaginationRange([firstPageIndex, DOTS, ...rightRange]);

      return;
    }

    // case 4
    if (isShowLeftDots && isShowRightDots) {
      const middleRange = getRange(leftSiblingStartIndex, rightSiblingEndIndex);

      setPaginationRange([
        firstPageIndex,
        DOTS,
        ...middleRange,
        DOTS,
        lastPageIndex,
      ]);

      return;
    }
  }, [currentPage, numberOfPages, siblingsCount]);
  return paginationRange;
};

export default usePagination;
