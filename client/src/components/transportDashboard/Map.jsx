import React, { useRef, useState } from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import useGeoLocation from "./components/useGeoLocation.jsx";

import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import L from "leaflet"
import osm from '../../Website/Components/osmProviders'
import "leaflet/dist/leaflet.css"
import locations from './components/location.js'


const Map = () => {

    
  const [center, setCenter] = useState({ lat: 6.8504824, lng: 79.9590567});
  const ZOOM_LEVEL = 10;
  const mapRef = useRef();

  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.leafletElement.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  const markerIcon = new L.Icon({
    iconUrl: require("../../assests/placeholder.png"),
    iconSize: [45, 45],
    iconAnchor: [17, 45], //[left/right, top/bottom]
    popupAnchor: [0, -46]
  })

  const markerIcon2 = new L.Icon({
    iconUrl: require("../../assests/box-truck.png"),
    iconSize: [45, 45],
    iconAnchor: [17, 45], //[left/right, top/bottom]
    popupAnchor: [0, -46]
  })
  return (
    <div>
        <Header />
        <Sidebar />
        <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            ref ={mapRef}
        >
            <TileLayer
            url={osm.maptiler.url} 
            attribution={osm.maptiler.attribution}/>

            {location.loaded && !location.error && locations.map(loc =>
                <Marker
                  icon={markerIcon2}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>
              )}
        
        {locations.map(loc =>   <Marker
             position={[loc.lat, loc.lng]}
             icon={markerIcon}
            >
            
            <Popup>
                <b>{loc.name}</b>
            </Popup>
            </Marker>

            )}
        </MapContainer>

       
                   
    </div>

    
  )
}

export default Map
