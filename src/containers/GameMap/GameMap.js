import React, { useEffect } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

import classes from './GameMap.module.css';
import * as actions from '../../store/actions/index';

import MarkerList from './MarkerList/MarkerList';

import PropTypes from 'prop-types';

const INITIAL_MAP_ZOOM = 16;
const COORDINATES_REFRESH_INTERVAL = 60000;

const GameMap = (props) => {
  const { match } = props;
  const gameId = match.params.gameId;

  useEffect(() => {
    props.onGameDataFetched(gameId);
    const timer = setInterval(() => {
      props.onUsersCoordinatesFetched(gameId);
    }, COORDINATES_REFRESH_INTERVAL);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Map
        className={classes.Map}
        center={props.game.location}
        zoom={INITIAL_MAP_ZOOM}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerList markers={props.coordinates} />
      </Map>
    </React.Fragment>
  );
};

GameMap.propTypes = {
  match: PropTypes.object,
  onGameDataFetched: PropTypes.func,
  onUsersCoordinatesFetched: PropTypes.func,
  coordinates: PropTypes.arrayOf(PropTypes.object),
  game: PropTypes.shape({
    location: PropTypes.array,
  }),
};

const mapStateToProps = (state) => {
  return {
    game: state.gameMap.game,
    coordinates: state.gameMap.coordinates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGameDataFetched: (gameId) => dispatch(actions.getGameData(gameId)),
    onUsersCoordinatesFetched: (gameId) =>
      dispatch(actions.getUsersCoordinatesData(gameId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMap);
