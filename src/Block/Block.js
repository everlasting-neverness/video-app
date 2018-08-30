import React from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Block extends React.Component {
  render() {
    let moviesToRender;
    if (!this.props.movies) {
      moviesToRender = <div>No movies found</div>;
    } else {
      moviesToRender = this.props.movies.Search.map(movie => {
        return (
          <div className="movie-block" key={movie.imdbID}>
            <Link
              to={{
                pathname: `/movie/${movie.imdbID}`,
                state: { movie: movie.imdbID }
              }}
            >
              <img
                className="main-page-logo"
                src={movie.Poster}
                alt={movie.Title + " logo"}
              />
              <span className="main-page-movie-title">{movie.Title}</span>
            </Link>
          </div>
        );
      });
    }
    return (
      <TransitionGroup className="movie-section" component={'section'} >
        <CSSTransition
          key={this.props.load}
          appear={true}
          timeout={2000}
          classNames="block"
        >
          <div className="block-for-movies">{moviesToRender}</div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default Block;
