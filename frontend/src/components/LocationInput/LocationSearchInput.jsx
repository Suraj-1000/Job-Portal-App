import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationSearchInput = ({ value, onChange, placeholder = "Enter location" }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searching, setSearching] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Handle clicking outside to close suggestions
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleInput = async (e) => {
        const val = e.target.value;
        onChange(val);

        if (val.length < 3) {
            setSuggestions([]);
            return;
        }

        setSearching(true);
        try {
            // Using OpenStreetMap Nominatim API
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${val}&addressdetails=1&limit=5`);
            setSuggestions(response.data);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching location suggestions", error);
        } finally {
            setSearching(false);
        }
    };

    const handleSelect = (suggestion) => {
        onChange(suggestion.display_name);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className="location-search-wrapper" ref={wrapperRef} style={{ position: 'relative' }}>
            <input
                type="text"
                value={value}
                onChange={handleInput}
                placeholder={placeholder}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '0 0 4px 4px',
                    zIndex: 1000,
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    {suggestions.map((item) => (
                        <li
                            key={item.place_id}
                            onClick={() => handleSelect(item)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            <FaMapMarkerAlt style={{ color: '#666' }} />
                            <span style={{ fontSize: '0.9rem', color: '#333' }}>
                                {item.display_name}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocationSearchInput;
