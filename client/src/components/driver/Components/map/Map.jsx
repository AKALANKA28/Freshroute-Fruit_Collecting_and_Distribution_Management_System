import React, { useEffect, useRef, useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import useGeoLocation from './useGeoLocation';
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import locations from './Location.js'
import osm from './osmProviders.jsx'

import './map.css'
import LocationMarker from './LocationMarker.jsx';
const Map = () => {


    const location = useGeoLocation();
    const [center, setCenter] = useState(null);
    const ZOOM_LEVEL = 13;
    const mapRef = useRef();


    const markerIcon = new L.Icon({
      iconUrl: require("../../../../assests/placeholder.png"),
      iconSize: [45, 45],
      iconAnchor: [17, 45], //[left/right, top/bottom]
      popupAnchor: [0, -46]
    })
  
    const markerIcon2 = new L.Icon({
      iconUrl: require("../../../../assests/box-truck.png"),
      iconSize: [45, 45],
      iconAnchor: [17, 45], //[left/right, top/bottom]
      popupAnchor: [0, -46]
    })


  // Update center when location is loaded
  useEffect(() => {
    if (location.loaded && !location.error) {
      setCenter({ lat: location.coordinates.lat, lng: location.coordinates.lng });
    }
  }, [location]);


  return ( 
    <div style={{ height: '380px' }}>
       <MapContainer
            center={center || { lat: 7.873054, lng: 80.771797 }} // Use current location if available, otherwise use the default center
            zoom={ZOOM_LEVEL}
            ref ={mapRef}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '500px' }}
            className="map-container"
        >
            <TileLayer
            url={osm.maptiler.url} 
            attribution={osm.maptiler.attribution}/>



{/* ---------live location--------- */}
            {location.loaded && !location.error && locations.map(loc =>
                <Marker
                  icon={markerIcon2}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>
              )}




{/* ---------other locations---------*/}
        {/* {locations.map(loc =>   <Marker
             position={[loc.lat, loc.lng]}
             icon={markerIcon}
            >
            
            <Popup>
                <b>{loc.name}</b>
            </Popup>
            </Marker>

            )} */}

{/* ---------click to show current locations---------*/}
      
            <LocationMarker/>

        </MapContainer>

    </div>
  )
}

export default Map
