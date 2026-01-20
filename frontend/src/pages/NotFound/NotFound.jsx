import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <h1 className="not-found-code">404</h1>
            <h2 className="not-found-title">Page Not Found</h2>
            <p className="not-found-desc">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <button className="back-button" onClick={() => navigate('/')}>
                Go Back Home
            </button>
        </div>
    );
};

export default NotFound;
