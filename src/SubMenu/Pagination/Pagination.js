import React from "react";
import PaginationButton from "./PaginationButton.js";

function Pagination(props) {
  let current = Number(props.moviesPageNumber),
    last = props.numberOfPages,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(
          <PaginationButton
            num={l + 1}
            handleMoviesPageChange={props.handleMoviesPageChange}
            moviesPageNumber={props.moviesPageNumber}
          />
        );
      } else if (i - l !== 1) {
        rangeWithDots.push(<span className="dots">...</span>);
      }
    }
    rangeWithDots.push(
      <PaginationButton
        num={i}
        handleMoviesPageChange={props.handleMoviesPageChange}
        moviesPageNumber={props.moviesPageNumber}
      />
    );
    l = i;
  }

  return <div className="pagination-buttons">{rangeWithDots}</div>;
}

export default Pagination;
