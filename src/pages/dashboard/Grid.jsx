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
                        "Authorization": `Bearer ${token}`
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
                const token = localStorage.getItem("token");
                const res = await fetch(`${API}/api/doctors`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();

                // If API returns array directly
                const doctorsArray = Array.isArray(data) ? data : data.doctors || [];
                setTotalStaff(doctorsArray.length);

            } catch (err) {
                console.error("Failed to fetch doctors", err);
                setTotalStaff(0);
            }
        };
        fetchDoctors();
    }, [API]);


    return (
        <div className="h-[calc(100vh-92px)] flex flex-col">
            {/* Top row: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[40%]">
                <div className="h-full flex min-w-[200px]">
                    <TotalPatients totalPatients={totalPatients} lastMonthPatients={lastMonthPatients} />
                </div>
                <div className="h-full flex min-w-[200px]">
                    <AvailableStaff totalStaff={totalStaff} />
                </div>
                <div className="h-full flex min-w-[200px]">
                    <AgeDistribution />
                </div>
            </div>



            {/* Space between rows */}
            <div className="my-4"></div> {/* optional vertical spacing */}

            {/* Bottom row: 2 cards, same full width as top row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[55%] w-full">
                <div className="col-span-1 lg:col-span-8 h-full flex min-w-[300px]">
                    <BarChart />
                </div>
                <div className="col-span-1 lg:col-span-4 h-full flex min-w-[200px]">
                    <FullCalendar />
                </div>
            </div>
        </div>


    );
};
