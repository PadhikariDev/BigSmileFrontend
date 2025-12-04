import React from "react";
import { Topbar } from "./Topbar";
import Doctors from "../../components/Doctors";

const Team = () => {
    return (
        <div className="bg-[#FFFCFB] h-screen flex flex-col p-2 rounded-2xl shadow-md overflow-hidden">
            <Topbar title="Teams"
                description="Manage your team members, roles, and collaboration settings."
            />
            {/* Content Area */}
            <div className="flex-1 px-2 py-2">
                {/* Doctors Section */}
                <Doctors />
            </div>
        </div>
    );
};

export default Team;
