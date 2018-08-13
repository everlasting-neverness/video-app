import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory"

import Item from "./Item/Item.js";
import Main from "./Main/Main.js";

const history = createBrowserHistory();

class DefaultRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/movie/:id" component={Item} />
        </Switch>
      </Router>
    )
  }
}

export default DefaultRouter;
