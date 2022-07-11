import React from 'react';
import PropTypes from 'prop-types';

import Marker from './Marker/Marker';

const markerList = (props) => {
  const mapMarkers = props.markers.map((marker) => {
    return <Marker key={marker.userId} markerData={marker} />;
  });

  return <React.Fragment>{mapMarkers}</React.Fragment>;
};

markerList.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.object),
};

export default markerList;
