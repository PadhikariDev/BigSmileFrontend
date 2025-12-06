import React from "react";
import { Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import CountUp from "react-countup";

const TotalPatients = ({ totalPatients, lastMonthPatients }) => {
    const growthCount = totalPatients - lastMonthPatients;
    const growthPercent =
        lastMonthPatients > 0
            ? ((growthCount / lastMonthPatients) * 100).toFixed(1)
            : 0;

    const isPositive = growthCount >= 0;

    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between cursor-pointer">

            {/* Row 1: Icon + Title */}
            <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-200 to-orange-400 p-3 rounded-xl shadow-inner">
                    <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium tracking-wide text-black uppercase">
                    Total Patients
                </p>
            </div>

            {/* Row 2: Count + Growth */}
            <div className="flex items-end justify-between">
                <span className="text-4xl font-extrabold text-black">
                    <CountUp end={totalPatients} duration={2} separator="," />
                </span>
                <div
                    className={`flex items-center text-sm font-semibold px-2 py-1 rounded-lg ${isPositive
                        ? "text-green-700 bg-green-100"
                        : "text-red-700 bg-red-100"
                        }`}
                >
                    {isPositive ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    <CountUp
                        end={Math.abs(growthPercent)}
                        duration={2}
                        decimals={1}
                    />%
                </div>
            </div>

            {/* Row 3: Subtle comparison */}
            <div className="mt-3 space-y-1">
                <p className="text-xs text-black/70">
                    {isPositive
                        ? `+${growthCount} more than last month`
                        : `${Math.abs(growthCount)} fewer than last month`}
                </p>
                <p className="text-xs text-black/50">
                    Last month:{" "}
                    <span className="font-medium text-black/70">
                        <CountUp end={lastMonthPatients} duration={1.5} separator="," />
                    </span>
                </p>
            </div>
        </div>
    );
};

export default TotalPatients;
