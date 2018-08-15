import React from "react";

function SearchForm(props) {
  return (
    <form onSubmit={props.handleUserInput}>
      <input type="text" />
      <button type="Submit">Search</button>
    </form>
  );
}

export default SearchForm;
