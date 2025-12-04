import React, { useEffect, useState } from "react";

const Popup = ({ message, onClose }) => {
    const [progress, setProgress] = useState(100); // progress bar percentage

    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        const interval = setInterval(() => {
            setProgress((prev) => (prev > 0 ? prev - 2 : 0)); // 100 -> 0 in ~5s
        }, 100);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onClose]);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>
            <div className="relative bg-[#EEEEEE] rounded-xl shadow-2xl p-6 w-80 text-center z-10 overflow-hidden">
                <h2 className="text-xl font-semibold text-red-600 mb-2">Login Failed</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-[#c94d50] text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                >
                    Close
                </button>
                <div className="absolute bottom-0 left-0 h-1 bg-[#c94d50]"
                    style={{ width: `${progress}%`, transition: "width 0.1s linear" }}>
                </div>
            </div>
        </div>
    );
};

export default Popup;
