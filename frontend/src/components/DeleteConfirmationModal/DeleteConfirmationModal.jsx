import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';


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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[2100] backdrop-blur-[2px] animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
            <div className="bg-white p-8 rounded-xl w-[90%] max-w-[420px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-[scaleUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
                <div className="w-[60px] h-[60px] bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <FaExclamationTriangle className="text-[1.8rem] text-red-500" />
                </div>
                <h2 className="m-0 mb-3 text-slate-800 text-2xl font-bold">{title}</h2>
                <p className="text-slate-600 mb-2 leading-relaxed">{displayMessage}</p>
                <p className="text-sm text-red-500 font-medium mb-8 bg-red-50 py-2 px-3 rounded inline-block">This action cannot be undone.</p>
                <div className="flex justify-center gap-4">
                    <button className="py-2.5 px-6 border-none rounded-lg font-semibold cursor-pointer transition-all duration-200 bg-slate-100 text-slate-600 hover:bg-slate-200" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="py-2.5 px-6 border-none rounded-lg font-semibold cursor-pointer transition-all duration-200 bg-red-600 text-white shadow-[0_4px_12px_rgba(220,53,69,0.3)] hover:bg-red-700 hover:-translate-y-0.5" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
