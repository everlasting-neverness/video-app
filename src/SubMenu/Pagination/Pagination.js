import React from "react";
import { Link } from "react-router-dom";

function Pagination(props) {
  let output = [];
  for (let i = 1; i <= props.numberOfPages; i++) {
    output.push(
      <button
        className={`pagination-btn ${
          String(i) === props.moviesPageNumber ? "pagination-btn-active" : ""
        }`}
        onClick={props.handleMoviesPageChange}
        value={i}
      >
        {i}
      </button>
    );
  }

  return <div className="pagination-buttons">{output}</div>;
}

export default Pagination;
