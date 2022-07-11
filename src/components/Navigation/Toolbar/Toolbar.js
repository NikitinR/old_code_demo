import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from '@material-ui/icons';

import classes from './Toolbar.module.css';
import burgerLogo from '../../../assets/images/logo.png';
import * as actions from '../../../store/actions/index';

import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';

import PropTypes from 'prop-types';

const Toolbar = (props) => {
  const { t } = useTranslation();

  const toggleSidebarHandler = (e) => {
    e.preventDefault();
    props.onToggleSidebar();
  };

  return (
    <header className={classes.AppHeader}>
      <Menu
        onClick={toggleSidebarHandler}
        className={classes.SidebarToggle}
        style={{ fontSize: 20 }}
      />
      <Link className={classes.Logo} to="/">
        <img src={burgerLogo} alt={t('app.sidebar.title')} />
        <div className={classes.AppName}>
          {t('app.title')} (v. {process.env.REACT_APP_VERSION})
        </div>
      </Link>

      <LanguageSwitcher />

      <ul className={classes.Menu}>
        {props.isAuthenticated ? (
          <li className={classes.MenuElement}>
            <Link to="/logout">{t('app.toolbar.logout')}</Link>
          </li>
        ) : (
          <React.Fragment>
            <li className={classes.MenuElement}>
              <Link to="/login">{t('app.toolbar.login')}</Link>
            </li>
            <li className={classes.MenuElement}>
              <Link to="/signup">{t('app.toolbar.signup')}</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </header>
  );
};

Toolbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleSidebar: () => dispatch(actions.toggleSidebar()),
  };
};

export default connect(null, mapDispatchToProps)(Toolbar);
