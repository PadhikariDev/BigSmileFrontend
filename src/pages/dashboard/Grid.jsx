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
    const API = import.meta.env.VITE_BACKEND_URL;

    // Fetch patients
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API}/api/patients`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`  // <-- include your token
                    }
                });
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
    }, [API]);

    // Fetch doctors/staff
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`${API}/api/doctors`);
                const data = await res.json();

                if (data.success && Array.isArray(data.doctors)) {
                    setTotalStaff(data.doctors.length);
                } else if (Array.isArray(data)) {
                    // fallback if API returns plain array
                    setTotalStaff(data.length);
                }
            } catch (err) {
                console.error("Failed to fetch doctors", err);
            }
        };
        fetchDoctors();
    }, [API]);

    return (
        <div
            className="grid grid-rows-3 gap-6"
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
                    <FullCalendar />
                </div>
            </div>
        </div>
    );
};
