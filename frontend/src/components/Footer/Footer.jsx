import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Footer.css';

// Fix for default marker icon in Leaflet with bundlers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const position = [27.705141, 85.321683]; // Putalisadak

  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        <div className="footer-content-wrapper">
          <div className="footer-left">
            <p>&copy; {currentYear} Job Test System. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <span>|</span>
              <a href="#terms">Terms of Service</a>
              <span>|</span>
              <a href="#support">Support</a>
            </div>
          </div>

          <div className="footer-map">
            <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: '150px', width: '300px', borderRadius: '8px' }}>
              <LayersControl position="topright">
                <LayersControl.BaseLayer name="Open Street Map">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer checked name="Google Map">
                  <TileLayer
                    attribution="Google Maps"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                  />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Google Map Satellite">
                  <LayerGroup>
                    <TileLayer
                      attribution="Google Maps Satellite"
                      url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                    />
                    <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
                  </LayerGroup>
                </LayersControl.BaseLayer>
              </LayersControl>
              <Marker position={position}>
                <Popup>We are here!</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

