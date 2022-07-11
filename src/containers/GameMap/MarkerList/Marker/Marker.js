import React from 'react';
import PropTypes from 'prop-types';

import { Marker, Popup } from 'react-leaflet';

const marker = (props) => {
  return (
    <Marker position={props.markerData.location}>
      <Popup>
        {props.markerData.userName} <br /> {props.markerData.userTeam}
      </Popup>
    </Marker>
  );
};

marker.propTypes = {
  markerData: PropTypes.object.isRequired,
};

export default marker;
