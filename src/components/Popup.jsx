import React, { useEffect, useState } from "react";
import error from "../assets/popupError.gif";
import close from "../assets/close.png";

const Popup = ({ message, onClose }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        const interval = setInterval(() => {
            setProgress((prev) => (prev > 0 ? prev - 2 : 0));
        }, 100);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>

            {/* Popup card */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md text-center z-10 overflow-hidden p-6 flex flex-col items-center">

                {/* Close icon */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
                >
                    <img src={close} alt="Close" className="w-5 h-5" />
                </button>

                {/* Error GIF */}
                <img
                    src={error}
                    alt="Error Icon"
                    className="w-20 h-20 mb-4 object-contain"
                />

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-2">
                    Login Failed
                </h2>

                {/* Message */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                    {message}
                </p>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-medium cursor-pointer"
                >
                    Close
                </button>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-red-600"
                    style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                ></div>
            </div>
        </div>
    );
};

export default Popup;
