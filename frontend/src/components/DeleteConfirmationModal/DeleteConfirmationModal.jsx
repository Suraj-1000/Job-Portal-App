import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Delete",
    message,
    itemName,
    itemType = "item"
}) => {
    if (!isOpen) return null;

    // Generate default message if not provided
    const defaultMessage = itemName
        ? `Are you sure you want to delete "${itemName}"?`
        : `Are you sure you want to delete this ${itemType}?`;

    const displayMessage = message || defaultMessage;

    return (
        <div className="delete-modal-overlay" onClick={onClose}>
            <div className="delete-modal" onClick={e => e.stopPropagation()}>
                <div className="delete-icon-wrapper">
                    <FaExclamationTriangle className="delete-icon" />
                </div>
                <h2>{title}</h2>
                <p>{displayMessage}</p>
                <p className="delete-warning">This action cannot be undone.</p>
                <div className="delete-actions">
                    <button className="btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn-delete" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
