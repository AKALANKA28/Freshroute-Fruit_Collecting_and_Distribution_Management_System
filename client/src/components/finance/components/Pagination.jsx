import React from "react";
import "../../../App"

function Pagination({ currentPage, totalPages, handleNextPage, handlePreviousPage, handlePageChange }) {
  // Generate an array of page numbers from 1 to totalPages
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="pagination d-flex align-items-center justify-content-end me-3">
      <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pag-btn">Previous</button>
      {pages.map((page) => (
        <button key={page} onClick={() => handlePageChange(page)} className="pag-page">{page}</button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pag-btn">Next</button>
    </div>
  );
}

export default Pagination;
