import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 text-center p-5 font-sans">
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
            <h1 className="text-[8rem] font-black text-slate-800 m-0 leading-none bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent" style={{ animation: 'float 6s ease-in-out infinite' }}>404</h1>
            <h2 className="text-4xl text-slate-700 font-bold my-5">Page Not Found</h2>
            <p className="text-lg text-slate-500 mb-10 max-w-[500px]">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-md border-none cursor-pointer" onClick={() => navigate('/')}>
                Go Back Home
            </button>
        </div>
    );
};

export default NotFound;
