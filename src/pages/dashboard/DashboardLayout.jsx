import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar"

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-[#f8f9f0]  p-4">
                <Sidebar />
            </div>

            {/* Page Content */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#f8f9f0]">
                <Outlet />
                {/* Loads Team, Users, Home etc. */}
            </div>

        </div>
    );
};

export default DashboardLayout;
