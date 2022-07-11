import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import classes from '../../../components/UI/Input/Input.module.css';
import classesAuth from '../../Auth/Auth.module.css';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';

import PropTypes from 'prop-types';

const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .email('app.validation.email_is_invalid')
    .required('app.validation.email_is_required'),
  password: Yup.string().required('app.validation.required'),
});

const Login = (props) => {
  const { t } = useTranslation();
  let authRedirect = null;

  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPatch} />;
  }

  const { onSetAuthRedirectPatch } = props;

  useEffect(() => {
    if (props.authRedirectPatch === '/login') {
      onSetAuthRedirectPatch();
    }
  }, [onSetAuthRedirectPatch, props.authRedirectPatch]);

  const loginForm = (
    <React.Fragment>
      {authRedirect}
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          props.onLogin(values.login, values.password);
        }}
      >
        {({ errors, touched }) => (
          <Form className={classesAuth.AuthForm}>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="login">
                {t('app.login.login_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="login"
                name="login"
                placeholder={t('app.login.login_placeholder')}
              />
              {errors.login && touched.login ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.login}`)}
                </div>
              ) : null}
            </div>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="password">
                {t('app.login.password_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="password"
                name="password"
                placeholder={t('app.login.password_placeholder')}
                type="password"
              />
              {errors.password && touched.password ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.password}`)}
                </div>
              ) : null}
            </div>
            <Button btntype="Success" type="submit">
              {t('app.login.login_button')}
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );

  return <div>{loginForm}</div>;
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogin: PropTypes.func,
  onSetAuthRedirectPatch: PropTypes.func,
  authRedirectPatch: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPatch: state.auth.authRedirectPatch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (login, password) => dispatch(actions.login(login, password)),
    onSetAuthRedirectPatch: () => dispatch(actions.setAuthRedirectPatch('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
