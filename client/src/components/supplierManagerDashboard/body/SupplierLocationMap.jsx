import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const SupplierLocationMap = ({ suppliers }) => {
  const mapCenter = [7.8731, 80.7718]; // Center of Sri Lanka
  const mapZoom = 7; // Initial zoom level

  // Define custom icon for markers
  const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {suppliers.map((supplier) => (
          supplier.latitude && supplier.longitude && (
            <Marker
              key={supplier._id}
              position={[parseFloat(supplier.latitude), parseFloat(supplier.longitude)]}
              icon={icon}
            >
              <Popup>{supplier.city}</Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default SupplierLocationMap;
