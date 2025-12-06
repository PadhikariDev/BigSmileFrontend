import React from "react";
import { UserCheck } from "lucide-react";
import CountUp from "react-countup";

const AvailableStaff = ({ totalStaff }) => {
    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between cursor-pointer">

            {/* Row 1: Icon + Title */}
            <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-200 to-blue-400 p-3 rounded-xl shadow-inner">
                    <UserCheck className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium tracking-wide text-black uppercase">
                    Available Staff
                </p>
            </div>

            {/* Row 2: Count */}
            <div className="flex items-center justify-center flex-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-black">
                    <CountUp end={totalStaff} duration={2} separator="," />
                </span>
            </div>

            {/* Row 3: Subtle note */}
            <div className="mt-3 text-center">
                <p className="text-xs text-black/70">
                    Total staff currently available
                </p>
            </div>
        </div>
    );
};

export default AvailableStaff;
