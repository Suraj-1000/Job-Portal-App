import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './ContactUs.css';

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

const ContactUs = () => {
    const position = [27.705141, 85.321683]; // Putalisadak, Kathmandu approx

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get in Touch</h1>
                    <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="contact-content-wrapper">
                    <div className="contact-grid">
                        <div className="contact-info-card">
                            <h2>Contact Information</h2>
                            <p>Detailed contact info specifically related to our headquarters.</p>

                            <div className="info-item">
                                <div className="info-icon"><FaPhone /></div>
                                <div>
                                    <h3>Phone</h3>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon"><FaEnvelope /></div>
                                <div>
                                    <h3>Email</h3>
                                    <p>support@jobportal.com</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon"><FaMapMarkerAlt /></div>
                                <div>
                                    <h3>Office</h3>
                                    <p>Putalisadak, Kathmandu<br />Nepal</p>
                                </div>
                            </div>
                        </div>

                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" placeholder="How can we help?" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="Write your message here..."></textarea>
                            </div>
                            <button type="submit" className="btn-send">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </div>

                    <div className="map-container">
                        <MapContainer
                            center={position}
                            zoom={15}
                            scrollWheelZoom={false}
                            style={{ height: '400px', width: '100%', borderRadius: '16px', zIndex: 1 }}
                        >
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
                                    <TileLayer
                                        attribution="Google Maps Satellite"
                                        url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                                    />
                                </LayersControl.BaseLayer>
                            </LayersControl>

                            <Marker position={position}>
                                <Popup>
                                    JobPortal HQ <br /> Putalisadak, Kathmandu.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
