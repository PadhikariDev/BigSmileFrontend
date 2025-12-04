import React, { useEffect, useState } from "react";
import TotalPatients from "./GridElements/TotalPatients";
import AvailableStaff from "./GridElements/AvailableStaff";
import AgeDistribution from "./GridElements/AgeDistribution";
import BarChart from "./GridElements/BarChart";
import FullCalendar from "./GridElements/FullCalendar";

export const Grid = () => {
    const [totalPatients, setTotalPatients] = useState(0);
    const [lastMonthPatients, setLastMonthPatients] = useState(0);
    const [totalStaff, setTotalStaff] = useState(0);

    // Fetch patients
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/patients");
                const data = await res.json();

                if (data.success && Array.isArray(data.patients)) {
                    const patients = data.patients;

                    setTotalPatients(patients.length);

                    const now = new Date();
                    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

                    const lastMonthCount = patients.filter((p) => {
                        if (!p.createdAt) return false;
                        const created = new Date(p.createdAt);
                        return created >= lastMonthStart && created <= lastMonthEnd;
                    }).length;

                    setLastMonthPatients(lastMonthCount);
                }
            } catch (err) {
                console.error("Failed to fetch patients", err);
            }
        };
        fetchPatients();
    }, []);

    // Fetch doctors/staff
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/doctors");
                const data = await res.json();

                if (Array.isArray(data)) {
                    setTotalStaff(data.length);
                }
            } catch (err) {
                console.error("Failed to fetch doctors", err);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div
            className="grid grid-rows-3 gap-6 "
            style={{ height: "calc(100vh - 92px)" }}
        >
            {/* Row 1 */}
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-center h-full">
                    <TotalPatients totalPatients={totalPatients} lastMonthPatients={lastMonthPatients} />
                </div>
                <div className="flex items-center justify-center h-full">
                    <AvailableStaff totalStaff={totalStaff} />
                </div>
                <div className="flex items-center justify-center h-full">
                    <AgeDistribution />
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-4 h-full">
                <div className="flex items-center justify-center h-full col-span-2">
                    <BarChart />
                </div>
                <div className="w-full h-full flex items-center justify-center col-span-1">

                    <FullCalendar /> {/* your Nepali Calendar component */}

                </div>
            </div>
        </div>
    );
};
