import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <header className="top-menu">
        <div className="navbar">
          <button className="navbar-btn">
            <NavLink to="/">Movies</NavLink>
          </button>
          <button className="navbar-btn">
            <NavLink to="#">TV Series</NavLink>
          </button>
          <button className="navbar-btn">
            <NavLink to="#">Cartoons</NavLink>
          </button>
        </div>
        <SearchForm handleUserInput={this.props.handleUserInput} />
        <div className="title">Video</div>
      </header>
    );
  }
}

export default Nav;
