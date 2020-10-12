import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header/Header';
import { OverviewContainer } from './containers/OverviewContainer';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/">
              <OverviewContainer />
            </Route>
            <Route>
              <div>Not found :(</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
