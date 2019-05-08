import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Navigation from "./Components/Navigation.jsx";
import Favorites from "./Components/Favorites.jsx";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/favorite-sets" component={Favorites} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
