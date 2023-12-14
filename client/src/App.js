import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { createBrowserHistory } from "history";

import HomePage from './containers/HomePage/Loadable';
import Pexel from './containers/Pexel/Loadable';
import NotFoundPage from './containers/NotFoundPage/Loadable';

export const appHistory = createBrowserHistory();

class App extends Component {
  state = {
    response: {}
  };

  render() {
    return (
      <div className="App">
        <div className="container mt-10">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link active" href="/">Time Conversion</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/feed/1">Pexel Feed</a>
            </li>
          </ul>
        </div>
        <Router history={appHistory}>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/feed/:page" component={Pexel} />
        <Route component={NotFoundPage} />
      </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
