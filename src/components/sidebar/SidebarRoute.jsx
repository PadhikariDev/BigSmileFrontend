import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarRoute = ({ path, icon, title }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const isLogout = title === "Logout";
    const selected = location.pathname === path;

    const handleClick = () => {
        if (isLogout) {
            setShowLogoutModal(true); // open custom modal
        } else {
            navigate(path);
        }
    };

    const handleConfirmLogout = () => {
        localStorage.removeItem("token");
        setShowLogoutModal(false);
        navigate('/');
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const LogoutModal = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-80 text-center animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Logout</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Are you sure you want to logout?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleConfirmLogout}
                        className="px-4 py-2 bg-gradient-to-r from-[#d27f0a] to-[#ea940c] text-white rounded-lg hover:from-[#ea940c] hover:to-[#f5a623] font-semibold cursor-pointer"
                    >
                        Yes
                    </button>
                    <button
                        onClick={handleCancelLogout}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={handleClick}
                className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-all duration-300
                ${isLogout
                        ? "text-black font-semibold hover:bg-gradient-to-r hover:from-[#ea940c] hover:to-[#f5a623] hover:text-stone-950"
                        : selected
                            ? "bg-gradient-to-r from-[#d27f0a] to-[#ea940c] text-stone-950 shadow"
                            : "text-stone-900 hover:bg-gradient-to-r hover:from-[#ea940c] hover:to-[#f5a623] hover:text-stone-950"
                    } cursor-pointer`}
            >
                <FontAwesomeIcon icon={icon} className="text-base" />
                <span>{title}</span>
            </button>

            {showLogoutModal && createPortal(<LogoutModal />, document.body)}
        </>
    );
};

export default SidebarRoute;
