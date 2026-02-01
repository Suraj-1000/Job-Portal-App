import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


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
    <footer className="bg-white border-t border-[#ebedf0] py-6 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center gap-6 flex-wrap md:flex-col md:text-center">
          <div className="flex flex-col gap-3">
            <p className="text-[#636e72] text-sm m-0">&copy; {currentYear} Job Test System. All rights reserved.</p>
            <div className="flex items-center gap-3 md:justify-center">
              <a href="#privacy" className="text-[#636e72] no-underline text-sm transition-colors duration-200 hover:text-[#2d3436]">Privacy Policy</a>
              <span className="text-[#b2bec3] text-xs">|</span>
              <a href="#terms" className="text-[#636e72] no-underline text-sm transition-colors duration-200 hover:text-[#2d3436]">Terms of Service</a>
              <span className="text-[#b2bec3] text-xs">|</span>
              <a href="#support" className="text-[#636e72] no-underline text-sm transition-colors duration-200 hover:text-[#2d3436]">Support</a>
            </div>
          </div>

          <div className="border border-[#dfe6e9] rounded-lg overflow-hidden shadow-sm md:w-full">
            <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: '150px', width: '300px', borderRadius: '8px' }} className="w-[300px] h-[150px] md:w-full">
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

