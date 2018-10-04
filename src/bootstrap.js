import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import reducers from './reducers';
import reducers from './js/reducers';

import MainMenu from './components/mainMenu';
import PlayerBase from './components/playerBase';
import ResourcePage from './components/resourcePage';
import TechnologyMenu from './components/technologyMenu';
import NextRound from './components/nextRound';

const createStoreWithMiddleware = applyMiddleware()(createStore);

import 'bootstrap/dist/css/bootstrap.css';
import './style/main.scss';


function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainMenu} />
            <Route exact path="/PlayerBase" component={PlayerBase} />
            <Route exact path="/ResourcePage" component={ResourcePage} />
            <Route exact path="/TechnologyMenu" component={TechnologyMenu} />
            <Route exact path="/NextRound" component={NextRound} />
        </Switch>
      </BrowserRouter>
    </Provider>
    , document.querySelector('.app-wrapper'));
}

document.addEventListener('DOMContentLoaded', main);
