import React from "react";
import SearchForm from "../SearchForm/SearchForm";

class Nav extends React.Component {
  render() {
    return (
      <div className="top-menu">
        <div className="navbar">
          <button className="navbar-btn">
            <a href="/">Movies</a>
          </button>
          <button className="navbar-btn">
            <a href="#">TV Series</a>
          </button>
          <button className="navbar-btn">
            <a href="#">Cartoons</a>
          </button>
        </div>
        <SearchForm handleUserInput={this.props.handleUserInput} />
        <div className="title">Video</div>
      </div>
    );
  }
}

export default Nav;
