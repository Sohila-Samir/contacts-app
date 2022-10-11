import { useMemo } from "react";

const usePagination = (currentPage, numberOfPages, siblingsCount = 1) => {
  const rangeLimit = 5 + siblingsCount;

  const getRange = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => start + idx);
  };

  const paginationRange = useMemo(() => {
    // case 1
    if (numberOfPages <= rangeLimit) {
      return getRange(1, numberOfPages);
    }

    const leftSiblingsStartNumber = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingsEndNumber = Math.min(
      currentPage + siblingsCount,
      numberOfPages
    );

    const isShowLeftDots = leftSiblingsStartNumber > 2;
    const isShowRightDots = rightSiblingsEndNumber < numberOfPages - 2;

    const firstPage = 1;
    const lastPage = numberOfPages;

    const DOTS = "...";

    // case 2
    if (isShowLeftDots && !isShowRightDots) {
      console.log("case 2");

      const rightRangeLimit = 2 * siblingsCount + 3;

      const rightRange = getRange(
        numberOfPages - rightRangeLimit + 1,
        numberOfPages
      );

      return [firstPage, DOTS, ...rightRange];
    }

    // case 3
    if (!isShowLeftDots && isShowRightDots) {
      console.log("case 3");

      const leftRangeLimit = 2 * siblingsCount + 3;

      const leftRange = getRange(1, leftRangeLimit);

      return [...leftRange, DOTS, lastPage];
    }

    // case 4
    if (isShowLeftDots && isShowRightDots) {
      console.log("case 4");

      const middleRange = getRange(
        leftSiblingsStartNumber,
        rightSiblingsEndNumber
      );

      return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
    }
  }, [currentPage, numberOfPages, siblingsCount]);

  return paginationRange;
};

export default usePagination;
