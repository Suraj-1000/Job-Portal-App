import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';
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

const ContactUs = () => {
    const position = [27.705141, 85.321683]; // Putalisadak, Kathmandu approx


    return (
        <div className="py-16 px-5 pb-24 bg-slate-50 font-sans">
            <div className="max-w-[1100px] mx-auto">
                <div className="text-center max-w-[600px] mx-auto mb-16">
                    <h1 className="text-5xl text-slate-900 mb-5 font-bold">Get in Touch</h1>
                    <p className="text-lg text-slate-500 leading-relaxed">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="flex flex-col gap-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 bg-white rounded-3xl overflow-hidden shadow-xl">
                        <div className="bg-indigo-600 text-white p-12">
                            <h2 className="text-3xl mb-5 font-bold">Contact Information</h2>
                            <p className="text-indigo-100 mb-10">Detailed contact info specifically related to our headquarters.</p>

                            <div className="flex items-start gap-5 mb-8">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-lg"><FaPhone /></div>
                                <div>
                                    <h3 className="text-lg mb-1 font-semibold">Phone</h3>
                                    <p className="m-0 text-indigo-100">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 mb-8">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-lg"><FaEnvelope /></div>
                                <div>
                                    <h3 className="text-lg mb-1 font-semibold">Email</h3>
                                    <p className="m-0 text-indigo-100">support@jobportal.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 mb-8">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-lg"><FaMapMarkerAlt /></div>
                                <div>
                                    <h3 className="text-lg mb-1 font-semibold">Office</h3>
                                    <p className="m-0 text-indigo-100">Putalisadak, Kathmandu<br />Nepal</p>
                                </div>
                            </div>
                        </div>

                        <form className="p-12" onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-slate-700">Your Name</label>
                                <input type="text" placeholder="John Doe" className="w-full p-3.5 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all" />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-slate-700">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full p-3.5 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all" />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-slate-700">Subject</label>
                                <input type="text" placeholder="How can we help?" className="w-full p-3.5 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all" />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-slate-700">Message</label>
                                <textarea rows="5" placeholder="Write your message here..." className="w-full p-3.5 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"></textarea>
                            </div>
                            <button type="submit" className="bg-slate-900 text-white border-0 py-3.5 px-7 rounded-lg font-semibold flex items-center gap-2.5 cursor-pointer transition-all w-full justify-center hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-lg">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </div>

                    <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-md border border-slate-200">
                        <MapContainer
                            center={position}
                            zoom={15}
                            scrollWheelZoom={false}
                            style={{ height: '100%', width: '100%', zIndex: 1 }}
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
