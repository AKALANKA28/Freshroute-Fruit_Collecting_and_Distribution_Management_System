import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from "leaflet"

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const markerIcon3 = new L.Icon({
    iconUrl: require("../../../../assests/box-truck.png"),
    iconSize: [45, 45],
    iconAnchor: [17, 45], //[left/right, top/bottom]
    popupAnchor: [0, -46]
  })



  return position === null ? null : (
    <Marker 
      position={position}
      icon={markerIcon3}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
