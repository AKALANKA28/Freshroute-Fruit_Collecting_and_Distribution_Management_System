import React from "react";

function Pagination({ currentPage, totalPages, handleNextPage, handlePreviousPage }) {
  // Generate an array of page numbers from 1 to totalPages
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="pagination align-items-center  justify-content-end">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="me-4"
        style={{
          backgroundColor: "#ffffff",
          border: "none",
          padding: "0px 10px",
        }}
      >
        <i className="bi bi-chevron-left text-dark"></i>
      </button>
      <span
        className="text-dark"
        style={{ fontSize: "18px", fontWeight: "500" }}
      >
        <span className="me-4">{currentPage}</span>
        <span style={{ color: "#a4cc3c" }}>{totalPages}</span>
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="ms-4"
        style={{
          backgroundColor: "#ffffff",
          border: "none",
          padding: "0px 10px",
        }}
      >
        <i className="bi bi-chevron-right text-dark"></i>
      </button>
    </div>
  );
}

export default Pagination;
