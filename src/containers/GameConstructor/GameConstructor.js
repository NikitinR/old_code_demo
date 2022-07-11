import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import API from '../../api/index';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { Place } from '@material-ui/icons';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';

import classes from './GameConstructor.module.css';
import { FormInput } from '../../components/UI/Input/FormInput';
import { CustomDateTimePicker } from '../../components/UI/Input/CustomDateTimePicker';
import Button from '../../components/UI/Button/Button';

import CustomizedDialogs from '../../components/UI/Dialog/CustomizedDialogs';
import mapClasses from '../GameMap/GameMap.module.css';

import PropTypes from 'prop-types';

const INITIAL_MAP_ZOOM = 16;
const GAME_DEFAULT_LOCATION = [49.4376245, 32.0914789];

const schema = yup.object().shape({
  title: yup
    .string()
    .max(50, 'app.validation.max_count_validation')
    .required('app.validation.required'),
  description: yup
    .string()
    .max(2000, 'app.validation.min_count_validation')
    .required('app.validation.required'),
  location: yup.string().required('app.validation.required'),
});

function GameConstructor(props) {
  const { t } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState(null);

  const { register, handleSubmit, control, errors, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const gameData = { ...data };

    gameData.startDate = moment(gameData.startDate).format('x');
    gameData.endDate = moment(gameData.endDate).format('x');
    gameData.location = currentLocation;
    gameData.userId = props.userId;
    gameData.status = 'NEW';

    try {
      await API.post('/games', gameData);
      reset();
      setCurrentLocation('');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePickLocation = (e) => {
    setCurrentLocation([e.latlng.lat, e.latlng.lng]);
  };

  const handleDetectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      function (error) {
        console.error('Error Code = ' + error.code + ' - ' + error.message);
      }
    );
  };

  const MyMarker = (props) => {
    const initMarker = (ref) => {
      if (ref) {
        ref.leafletElement.openPopup();
      }
    };
    return <Marker ref={initMarker} {...props} />;
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <form
        autoComplete="off"
        className={classes.CreateGameForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          autoComplete="off"
          id="title"
          name="title"
          type="text"
          label={t('app.create_game.title_label')}
          placeholder={t('app.create_game.title_placeholder')}
          register={register}
          max="50"
          error={errors.title}
        />
        <CustomDateTimePicker
          dateTimePickerName="startDate"
          dateTimePickerControl={control}
          dateTimePickerLabel={t('app.create_game.start_label')}
          dateTimePickerOffset="1"
        />
        <CustomDateTimePicker
          dateTimePickerName="endDate"
          dateTimePickerControl={control}
          dateTimePickerLabel={t('app.create_game.end_label')}
          dateTimePickerOffset="2"
        />
        <FormInput
          id="description"
          name="description"
          type="textarea"
          label={t('app.create_game.description_label')}
          register={register}
          placeholder={t('app.create_game.description_label_placeholder')}
          inputtype="textarea"
          max="5000"
          error={errors.description}
        />
        <div className={classes.CoordinatesInput}>
          <FormInput
            id="location"
            name="location"
            type="text"
            label={t('app.create_game.location_label')}
            placeholder={t('app.create_game.location_placeholder')}
            register={register}
            error={errors.location}
            defaultValue={currentLocation}
            readOnly
          />
          <Place
            onClick={handleDetectLocation}
            className={classes.LocationIcon}
            style={{ fontSize: 20 }}
          />
        </div>
        <CustomizedDialogs
          title={t('app.create_game.location_placeholder')}
          dialogButtonTitle={t('app.create_game.pick_on_map_button')}
        >
          <Map
            className={mapClasses.DialogMap}
            center={currentLocation ? currentLocation : GAME_DEFAULT_LOCATION}
            zoom={INITIAL_MAP_ZOOM}
            onClick={handlePickLocation}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {currentLocation && (
              <MyMarker position={currentLocation}>
                <Popup position={currentLocation}>
                  {t('app.create_game.popup.game_location')}{' '}
                  <pre>{JSON.stringify(currentLocation, null, 2)}</pre>
                </Popup>
              </MyMarker>
            )}
          </Map>
        </CustomizedDialogs>
        <Button btntype="Success" type="submit">
          {t('app.create_game.create_game_button')}
        </Button>
      </form>
    </MuiPickersUtilsProvider>
  );
}

GameConstructor.propTypes = {
  userId: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, null)(GameConstructor);
