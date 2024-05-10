import React from "react";
import "../../../App"

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
      <i class="bi bi-chevron-left"></i>{" "}
    </button>
    <span
      className="text-dark"
      style={{ fontSize: "18px", fontWeight: "500" }}
    >
      <span className="me-4">{currentPage}</span>
      <span>{totalPages}</span>
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
      <i class="bi bi-chevron-right"></i>{" "}
    </button>
  </div>
  );
}

export default Pagination;
