import React from 'react';


const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[2000] animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
            <div className="bg-white p-[30px] rounded-xl w-[90%] max-w-[400px] text-center shadow-[0_10px_25px_rgba(0,0,0,0.1)] animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
                <h2 className="mt-0 text-slate-800 text-2xl mb-4">Confirm Logout</h2>
                <p className="text-slate-500 mb-[25px]">Are you sure you want to log out?</p>
                <div className="flex justify-center gap-[15px]">
                    <button className="py-2.5 px-6 border-none rounded-md font-semibold cursor-pointer transition-all duration-200 bg-slate-100 text-slate-500 hover:bg-slate-200" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="py-2.5 px-6 border-none rounded-md font-semibold cursor-pointer transition-all duration-200 bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_4px_6px_rgba(214,48,49,0.2)]" onClick={onConfirm}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
