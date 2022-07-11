import React from 'react';

import { Link } from 'react-router-dom';
import { Apps, Reorder, Games } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import classes from './Sidebar.module.css';
import classNames from 'classnames';

import PropTypes from 'prop-types';

const Sidebar = (props) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(classes.AppSidebar, {
        [`${classes.SidebarMinified}`]: props.isSidebarMinimized,
      })}
    >
      <ul className={classes.SidebarMenu}>
        <li className={classes.SidebarElement}>
          <Link to="/">
            <Apps style={{ fontSize: 20 }} />
            <div className={classes.MenuText}>{t('app.sidebar.main')}</div>
          </Link>
        </li>
        {props.isAuthenticated && (
          <li className={classes.SidebarElement}>
            <Link to="/game/create">
              <Games style={{ fontSize: 20 }} />
              <div className={classes.MenuText}>
                {t('app.sidebar.create_game')}
              </div>
            </Link>
          </li>
        )}
        {props.isAuthenticated && (
          <li className={classes.SidebarElement}>
            <Link to="/games">
              <Reorder style={{ fontSize: 20 }} />
              <div className={classes.MenuText}>
                {t('app.sidebar.game_list')}
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isAuthenticated: PropTypes.bool,
  isSidebarMinimized: PropTypes.bool,
};

export default Sidebar;
