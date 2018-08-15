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
      direction: "decr"
    };
    getData(this.state.userSearch, this.getMovies);
  }

  getMovies = incomingMovies => {
    this.sortMovies(incomingMovies, this.state.type, this.state.direction);
    this.setState({ movies: incomingMovies });
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
      if (e.target.name === "type") {
        this.setState({ type: value });
      } else {
        this.setState({ direction: value });
      }
    }
    let type = e.target.name === "type" ? value : this.state.type;
    let direction =
      e.target.name === "direction" ? value : this.state.direction;
    this.sortMovies(this.state.movies, type, direction);
  };

  sortMovies = (movies, type, direction) => {
    if (!type) {
      type = "Title";
    } else if (!direction) {
      direction = "decr";
    }
    movies.Search.sort((a, b) => {
      if (direction === "decr") {
        return a[type] < b[type] ? 1 : -1;
      } else {
        return a[type] > b[type] ? 1 : -1;
      }
    });
    this.setState({ movies: movies });
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
          direction={this.state.direction}
        />
        <Block movies={this.state.movies} />
      </div>
    );
  }
}

export default Main;
