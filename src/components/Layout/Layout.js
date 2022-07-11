import React from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

import classes from './Layout.module.css';
import classNames from 'classnames';

import PropTypes from 'prop-types';

const layout = (props) => (
  <React.Fragment>
    {/* <div className={classes.AppLayout}> */}
    <div
      className={classNames(classes.AppLayout, {
        [`${classes.SidebarMinified}`]: props.isSidebarMinimized,
      })}
    >
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        isSidebarMinimized={props.isSidebarMinimized}
      />
      <Sidebar
        isAuthenticated={props.isAuthenticated}
        isSidebarMinimized={props.isSidebarMinimized}
      />
      <main className={classes.AppMainContainer}>{props.children}</main>
    </div>
  </React.Fragment>
);

layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
  isSidebarMinimized: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isSidebarMinimized: state.navigation.isSidebarMinimized,
  };
};

export default connect(mapStateToProps)(layout);
