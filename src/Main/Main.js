import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Block from "../Block/Block";
import SubMenu from "../SubMenu/SubMenu.js";

function getData(search, fn) {
  if (!search) {
    search = "top";
  }
  const url = `http://www.omdbapi.com/?s=${search}&apikey=b1a126bc`;
  fetch(url)
    .then(data => data.json())
    .then(data => fn(data))
    .catch(error => console.log(error));
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      userSearch: "",
      type: "Title",
      way: "decr"
    };
    getData(this.state.userSearch, this.getMovies);
  }

  getMovies = incommingMovies => {
    this.sortMovies(incommingMovies);
    this.setState({ movies: incommingMovies });
  };

  componentDidMount = () => {
    let prevSearch = localStorage.getItem("prevSearch");
    if (prevSearch !== undefined) {
      prevSearch = JSON.parse(prevSearch);
      this.setState({ movies: prevSearch });
    }
  };

  componentDidUpdate = () => {
    const prevSearch = JSON.stringify(this.state.movies);
    localStorage.setItem("prevSearch", prevSearch);
    this.sortMovies(this.state.movies);
  };

  handleUserInput = e => {
    e.preventDefault();
    getData(e.target[0].value, this.getMovies);
    this.setState({ userSearch: e.target[0].value });
    return false;
  };

  handleSubMenuSelect = e => {
    const value = e.target.value;
    if (value !== this.state[e.target.name]) {
      console.log(value);
      if (e.target.name === 'type') {
        this.setState({ type: value });
      } else {
        this.setState({ way: value });
      }
      console.log(this.state.type);
    }
  };

  sortMovies = (movies) => {
    // console.log(this.state.type);
    movies.Search.sort((a, b) => {
      if (this.state.way === "decr") {
        return a[this.state.type] > b[this.state.type] ? 1 : -1;
      } else {
        return a[this.state.type] < b[this.state.type] ? 1 : -1;
      }
    });
  };

  render() {
    return (
      <div className="main-block">
        <div className="top-menu">
          <SearchForm handleUserInput={this.handleUserInput} />
          <div className="title">Video</div>
        </div>
        <SubMenu
          handleSubMenuSelect={this.handleSubMenuSelect}
          type={this.state.type}
          way={this.state.way}
        />
        <Block movies={this.state.movies} />
      </div>
    );
  }
}

export default Main;
