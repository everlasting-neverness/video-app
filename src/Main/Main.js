import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Block from "../Block/Block";

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
      userSearch: ""
    };
    getData(this.state.userSearch, this.getMovies);
  }

  getMovies = incommingMovies => {
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
  };

  handleUserInput = e => {
    e.preventDefault();
    getData(e.target[0].value, this.getMovies);
    this.setState({ userSearch: e.target[0].value });
    return false;
  };

  render() {
    return (
      <div className="main-block">
        <div className="top-menu">
          <SearchForm handleUserInput={this.handleUserInput} />
          <div className="title">Video</div>
        </div>
        <Block movies={this.state.movies} />
      </div>
    );
  }
}

export default Main;
