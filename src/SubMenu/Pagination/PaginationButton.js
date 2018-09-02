import React from "react";

function PaginationButton(props) {
  return (
    <button
      className={`pagination-btn ${
        String(props.num) === props.moviesPageNumber
          ? "pagination-btn-active"
          : ""
      }`}
      onClick={props.handleMoviesPageChange}
      value={props.num}
    >
      {props.num}
    </button>
  );
}

export default PaginationButton;
