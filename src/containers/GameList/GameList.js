import React, { useState, useEffect } from 'react';

import API from '../../api/index';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import classes from './GameList.module.css';

export const GameList = () => {
  const { t } = useTranslation();
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    getGameList();
  }, []);

  const getGameList = async () => {
    try {
      const gameListData = await API.get('/games');
      setGameList(gameListData.data.games);
    } catch (error) {
      console.log(error);
    }
  };

  const games = gameList.map((game) => (
    <li className={classes.GameListItem} key={game._id.toString()}>
      <Link
        className={classes.GameLink}
        to={`/games/info/${game._id.toString()}`}
      >
        {game.title}
      </Link>
      <Link className={classes.GameLink} to={`/games/${game._id.toString()}`}>
        {t('app.game_list.map_mode')}
      </Link>
      <div>
        {t('app.game_list.created')} {game.createdAt}
      </div>
      <div>
        {t('app.game_list.status')} {game.status}
      </div>
    </li>
  ));

  return (
    <div className={classes.AppGameList}>
      <ul className={classes.GameList}>{games}</ul>
    </div>
  );
};

export default GameList;
