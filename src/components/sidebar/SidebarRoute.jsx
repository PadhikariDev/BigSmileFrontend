import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarRoute = ({ path, icon, title }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLogout = title === "Logout";
    const selected = location.pathname === path;

    const handleClick = () => {
        if (isLogout) {
            navigate('/');
        } else {
            navigate(path);
        }
    };

    return (
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
    );
};

export default SidebarRoute;
