import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';

import Registration from './containers/Auth/Registration/Registration';
import Login from './containers/Auth/Login/Login';
import GameMap from './containers/GameMap/GameMap';
import GameConstructor from './containers/GameConstructor/GameConstructor';
import GameList from './containers/GameList/GameList';
import Game from './containers/Game/Game';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

import PropTypes from 'prop-types';

import './App.css';

const App = (props) => {
  const { onTryAutoLogin } = props;

  useEffect(() => {
    onTryAutoLogin();
  }, [onTryAutoLogin]);

  let routes = (
    <Switch>
      <Route path="/signup" component={Registration}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/game/create" component={GameConstructor}></Route>
        <Route path="/games/info/:gameId" component={Game}></Route>
        <Route path="/games/:gameId" component={GameMap}></Route>
        <Route path="/games" component={GameList}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

App.propTypes = {
  onTryAutoLogin: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = {
  onTryAutoLogin: actions.authCheckState,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
