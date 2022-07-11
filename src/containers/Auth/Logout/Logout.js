import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import PropTypes from 'prop-types';

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  }, [props]);

  return <Redirect to="/" />;
};

Logout.propTypes = {
  onLogout: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
