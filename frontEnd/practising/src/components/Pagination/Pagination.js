import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";

import "./Pagination.css";

const Pagination = ({
  numberOfPages,
  currentPage,
  route,
  siblingsCount = 1,
}) => {
  const navigate = useNavigate();

  const paginationRange = usePagination(
    currentPage,
    numberOfPages,
    siblingsCount
  );

  const DOTS = "...";

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

  return (
    <nav className="pagination">
      <button
        onClick={onClickPreviousPage}
        className="pagination__previous-page"
        disabled={currentPage === 1}
      >
        &#171;
      </button>

      <ul className="pagination__list">
        {paginationRange.map((pageNum, idx) =>
          pageNum === DOTS ? (
            <li key={`key__dot__${idx}`} className="pagination__dots">
              &#8230;
            </li>
          ) : (
            <li
              key={`key__${pageNum}`}
              className={`pagination__page-number ${isActive(pageNum)}`}
              onClick={onClickPage}
            >
              {pageNum}
            </li>
          )
        )}
      </ul>

      <button
        className="pagination__next-page"
        disabled={currentPage === numberOfPages}
        onClick={onClickNextPage}
      >
        &#187;
      </button>
    </nav>
  );
};

export default Pagination;
