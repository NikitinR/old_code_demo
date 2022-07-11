import React from 'react';
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

const RegistrationSchema = Yup.object().shape({
  nickname: Yup.string().required('app.validation.required'),
  email: Yup.string()
    .email('app.validation.email_is_invalid')
    .required('app.validation.email_is_required'),
  password: Yup.string()
    .min(5, 'app.validation.password_too_short')
    .required('app.validation.required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'app.validation.password_must_match')
    .required('app.validation.confirm_password_is_required'),
});

const Registration = (props) => {
  const { t } = useTranslation();
  let authRedirect = null;

  const { authRedirectPatch } = props;

  if (authRedirectPatch === '/login') {
    authRedirect = <Redirect to={authRedirectPatch} />;
  }

  const registrationForm = (
    <React.Fragment>
      {authRedirect}
      <Formik
        initialValues={{
          nickname: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          country: '',
          region: '',
          city: '',
        }}
        validationSchema={RegistrationSchema}
        onSubmit={async (values) => {
          props.onRegistration(
            values.nickname,
            values.email,
            values.password,
            values.passwordConfirmation,
            values.country,
            values.region,
            values.city
          );
        }}
      >
        {({ errors, touched }) => (
          <Form className={classesAuth.AuthForm}>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="nickname">
                {t('app.signup.nickname_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="nickname"
                name="nickname"
                placeholder={t('app.signup.nickname_placeholder')}
              />
              {errors.nickname && touched.nickname ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.nickname}`)}
                </div>
              ) : null}
            </div>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="email">
                {t('app.signup.email_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="email"
                name="email"
                placeholder={t('app.signup.email_placeholder')}
                type="email"
              />
              {errors.email && touched.email ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.email}`)}
                </div>
              ) : null}
            </div>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="password">
                {t('app.signup.password_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="password"
                name="password"
                type="password"
                placeholder={t('app.signup.password_placeholder')}
              />
              {errors.password && touched.password ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.password}`)}
                </div>
              ) : null}
            </div>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="passwordConfirmation">
                {t('app.signup.confirm_password_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder={t('app.signup.confirm_password_placeholder')}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.passwordConfirmation}`)}
                </div>
              ) : null}
            </div>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="country">
                {t('app.signup.country_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="country"
                name="country"
                placeholder={t('app.signup.country_placeholder')}
              />
              {errors.country && touched.country ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.country}`)}
                </div>
              ) : null}
            </div>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="region">
                {t('app.signup.region_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="region"
                name="region"
                placeholder={t('app.signup.region_placeholder')}
              />
              {errors.region && touched.region ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.region}`)}
                </div>
              ) : null}
            </div>
            <div className={classes.Input}>
              <label className={classes.Label} htmlFor="login">
                {t('app.signup.city_label')}
              </label>
              <Field
                className={classes.inputElement}
                id="city"
                name="city"
                placeholder={t('app.signup.city_placeholder')}
              />
              {errors.city && touched.city ? (
                <div className={classes.ValidationMessage}>
                  {t(`${errors.city}`)}
                </div>
              ) : null}
            </div>
            <Button btntype="Success" type="submit">
              {t('app.signup.registration_button')}
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );

  return <div>{registrationForm}</div>;
};

Registration.propTypes = {
  onRegistration: PropTypes.func,
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
    onRegistration: (
      nickname,
      email,
      password,
      passwordConfirmation,
      country,
      region,
      city
    ) =>
      dispatch(
        actions.registration(
          nickname,
          email,
          password,
          passwordConfirmation,
          country,
          region,
          city
        )
      ),

    onSetAuthRedirectPatch: () => dispatch(actions.setAuthRedirectPatch('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
