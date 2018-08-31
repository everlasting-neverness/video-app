import React from "react";
import Pagination from "./Pagination/Pagination.js";

function SubMenu(props) {
  return (
    <div className="sub-menu-block">
      <div className="pagination-block">
        <Pagination
          numberOfPages={props.numberOfPages}
          moviesPageNumber={props.moviesPageNumber}
          handleMoviesPageChange={props.handleMoviesPageChange}
        />
      </div>
      <form
        className="sub-menu-form"
        onChange={props.handleSubMenuTypeDirectionSelect}
      >
        <select
          defaultValue={props.type}
          name="type"
          id="select-type"
          className="sub-menu-select"
        >
          <option value="Year">Year</option>
          <option value="Title">Title</option>
        </select>
        <select
          defaultValue={props.direction}
          name="direction"
          id="select-direction"
          className="sub-menu-select"
        >
          <option value="incr">Increase</option>
          <option value="decr">Decrease</option>
        </select>
      </form>
    </div>
  );
}

export default SubMenu;
