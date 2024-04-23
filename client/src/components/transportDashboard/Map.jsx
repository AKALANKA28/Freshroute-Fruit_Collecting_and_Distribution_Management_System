import React, { useRef, useState } from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'

import osm from './components/osmProviders.jsx'
import useGeoLocation from "./components/useGeoLocation.jsx";

import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import locations from './components/location.js'


const Map = () => {
  
  const [center, setCenter] = useState({ lat: 6.8504824, lng: 79.9590567});
  const ZOOM_LEVEL = 10;
  const mapRef = useRef();

  const location = useGeoLocation();

  const showMyLocation = () => {
    if (mapRef.current && mapRef.current.leafletElement) {
      if (location.loaded && !location.error) {
        mapRef.current.leafletElement.flyTo(
          [location.coordinates.lat, location.coordinates.lng],
          ZOOM_LEVEL,
          { animate: true }
        );
      } else {
        alert(location.error.message);
      }
    } else {
      console.error("Map reference is not properly initialized.");
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
        <div className="main">
        <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            ref ={mapRef}
        >
            <TileLayer
            url={osm.maptiler.url} 
            attribution={osm.maptiler.attribution}/>

{/* live location */}
            {location.loaded && !location.error && locations.map(loc =>
                <Marker
                  icon={markerIcon2}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>
              )}

    {/* other locations     */}
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
       
          <div className="row my-4">
            <div className="col d-flex justify-content-center">
              <button
              className='btn btn-primary'
              onClick={showMyLocation}
              />
            </div>
          </div>
       
                   
    </div>

    
  )
}

export default Map
