import React from 'react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="logout-modal-overlay" onClick={onClose}>
            <div className="logout-modal" onClick={e => e.stopPropagation()}>
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="logout-actions">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
