import React from "react";

import { Link } from "react-router-dom";

class Item extends React.Component {
  state = {
    activeMovie: []
  };

  componentDidMount = async () => {
    const search = this.props.location.state.movie;
    const req = await fetch(
      `http://www.omdbapi.com/?i=${search}&apikey=b1a126bc`
    );
    const res = await req.json();
    this.setState({ activeMovie: res });
  };

  render() {
    return (
      <div>
        {this.state.activeMovie.length !== 0 && (
          <div className="item-block">
            <div className="poster-block">
              <img
                className="img-item"
                src={this.state.activeMovie.Poster}
                alt={this.state.activeMovie.Title}
              />
            </div>
            <div className="item-information">
              <div className="item-common-block">
                <span className="item-common-info">Title:</span>
                <span className="item-common-info-value">
                  {this.state.activeMovie.Title}
                </span>
              </div>
              <div className="item-common-block">
                <span className="item-common-info">Year:</span>
                <span className="item-common-info-value">
                  {this.state.activeMovie.Year}
                </span>
              </div>
              <div className="item-common-block">
                <span className="item-common-info">Genre:</span>
                <span className="item-common-info-value">
                  {this.state.activeMovie.Genre}
                </span>
              </div>
              <div className="item-common-block">
                <span className="item-common-info">Director:</span>
                <span className="item-common-info-value">
                  {this.state.activeMovie.Director}
                </span>
              </div>
              <div className="item-common-block">
                <span className="item-common-info plot">Actors:</span>
                <span className="item-common-info-value plot-content">
                  {this.state.activeMovie.Actors}
                </span>
              </div>
              <div className="item-common-block">
                <span className="item-common-info plot">Plot:</span>
                <span className="item-common-info-value plot-content">
                  {this.state.activeMovie.Plot}
                </span>
              </div>
            </div>
          </div>
        )}
        <button className="item-button"><Link to="/">Go back</Link></button>
      </div>
    );
  }
}

export default Item;
