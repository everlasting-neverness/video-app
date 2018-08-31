import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import Block from "../Block/Block";
import SubMenu from "../SubMenu/SubMenu.js";
import Item from "../Item/Item.js";
import Nav from "../Nav/Nav.js";
import Footer from "../Footer/Footer.js";

const history = createBrowserHistory();

function getData(search, fn, number) {
  if (!search) {
    search = "top";
  }
  const url = `http://www.omdbapi.com/?s=${search}&apikey=b1a126bc&page=${number}`;
  fetch(url)
    .then(data => data.json())
    .then(data => fn(data, url))
    .catch(error => console.log(error));
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      load: true,
      userSearch: "",
      numberOfPages: 10,
      moviesPageNumber: "1",
      type: "Title",
      direction: "decr"
    };
    getData(this.state.userSearch, this.getMovies, this.state.moviesPageNumber);
  }

  getMovies = (incomingMovies, url) => {
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
    this.setState({
      userSearch: e.target[0].value,
      load: !this.state.load,
      moviesPageNumber: 1
    });
    return false;
  };

  handleMoviesPageChange = e => {
    getData(this.state.userSearch, this.getMovies, e.target.value);
    this.setState({ moviesPageNumber: e.target.value });
  };

  handleSubMenuTypeDirectionSelect = e => {
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
    const MyNav = props => {
      return <Nav handleUserInput={this.handleUserInput} />;
    };
    return (
      <Router history={history}>
        <div className="main-block">
          <Route path="/" component={MyNav} />
          <Switch>
            <Route exact path="/">
              <section className="main-section">
                <SubMenu
                  numberOfPages={this.state.numberOfPages}
                  handleMoviesPageChange={this.handleMoviesPageChange}
                  moviesPageNumber={this.state.moviesPageNumber}
                  handleSubMenuTypeDirectionSelect={
                    this.handleSubMenuTypeDirectionSelect
                  }
                  type={this.state.type}
                  direction={this.state.direction}
                />
                <TransitionGroup
                  className="movie-section"
                  component={"section"}
                >
                  <CSSTransition
                    key={this.state.load}
                    appear={true}
                    timeout={700}
                    classNames="block"
                  >
                    <Block movies={this.state.movies} load={this.state.load} />
                  </CSSTransition>
                </TransitionGroup>
              </section>
            </Route>
            <Route path="/movie/:id" component={Item} />
          </Switch>
          <Route path="/" component={Footer} />
        </div>
      </Router>
    );
  }
}

export default Main;
