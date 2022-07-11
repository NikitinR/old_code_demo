import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import API from '../../api/index';

import classes from './Game.module.css';

import PropTypes from 'prop-types';

export const Game = (props) => {
  const { t } = useTranslation();
  const { match } = props;
  const gameId = match.params.gameId;

  const [gameData, setGameData] = useState({
    createdBy: { _id: null, nickname: null },
  });

  useEffect(() => {
    getGameData(gameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGameData = async (gameId) => {
    try {
      const gameData = await API.get('/games/' + gameId);
      setGameData(gameData.data.game);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.AppGameInfo}>
      <div className={classes.GameInfo}>
        {t('app.game_info.game_name')} {gameData.title} <br />
        {t('app.game_info.game_status')} {gameData.status} <br />
        {t('app.game_info.game_created')} {gameData.createdAt} <br />
        {t('app.game_info.game_start')} {gameData.startDate} <br />
        {t('app.game_info.game_end')} {gameData.endDate} <br />
        {t('app.game_info.game_description')} {gameData.description} <br />
        <a href={gameData.createdBy._id}>{gameData.createdBy.nickname}</a>
        <br />
      </div>
    </div>
  );
};

Game.propTypes = {
  match: PropTypes.object,
};

export default Game;
