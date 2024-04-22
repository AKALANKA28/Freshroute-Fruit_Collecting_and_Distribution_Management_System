import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const SupplierLocationMap = ({ suppliers }) => {
  const mapCenter = [7.8731, 80.7718]; // Center of Sri Lanka
  const mapZoom = 7; // Initial zoom level

  const [supplierCounts, setSupplierCounts] = useState({});
  const [hoveredSupplier, setHoveredSupplier] = useState(null);

  // Calculate the total number of suppliers for each city
  useEffect(() => {
    const counts = suppliers.reduce((acc, supplier) => {
      if (supplier.latitude && supplier.longitude && supplier.city) {
        acc[supplier.city] = (acc[supplier.city] || 0) + 1;
      }
      return acc;
    }, {});
    setSupplierCounts(counts);
  }, [suppliers]);

  // Define custom icon for markers
  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Ref for markers
  const markersRef = useRef([]);

  useEffect(() => {
    markersRef.current = Array(suppliers.length)
      .fill()
      .map((_, index) => markersRef.current[index] || React.createRef());
  }, [suppliers]);

  const handleMouseOver = (city) => {
    setHoveredSupplier(city);
  };

  const handleMouseOut = () => {
    setHoveredSupplier(null);
  };

  return (
    <div style={{ height: '500px', borderRadius: '15px', overflow: 'hidden' }}>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {suppliers.map((supplier, index) => (
          supplier.latitude &&
          supplier.longitude && (
            <Marker
              key={supplier._id}
              position={[parseFloat(supplier.latitude), parseFloat(supplier.longitude)]}
              icon={redIcon}
              ref={markersRef.current[index]}
              eventHandlers={{
                mouseover: () => handleMouseOver(supplier.city),
                mouseout: () => handleMouseOut(),
              }}
            >
              {(hoveredSupplier === supplier.city) && (
                <Popup>{supplier.city}: {supplierCounts[supplier.city] || 0} suppliers</Popup>
              )}
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default SupplierLocationMap;
