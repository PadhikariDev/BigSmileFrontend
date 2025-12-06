import React, { useEffect, useState } from "react";
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const BarChart = () => {
    const [patients, setPatients] = useState([]);
    const API = import.meta.env.VITE_BACKEND_URL; // backend URL

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API}/api/patients`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await res.json();

                if (data.success && Array.isArray(data.patients)) {
                    setPatients(data.patients);
                }
            } catch (err) {
                console.error("Failed to fetch patients", err);
            }
        };

        fetchPatients();
    }, [API]);

    // English months
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Count patients per month based on AD date
    const monthlyCounts = Array(12).fill(0);
    patients.forEach(p => {
        if (p.general?.date) {
            const date = new Date(p.general.date);
            if (!isNaN(date)) {
                const month = date.getMonth();
                monthlyCounts[month]++;
            }
        }
    });

    const chartData = months.map((month, index) => ({
        month,
        patients: monthlyCounts[index],
    }));

    return (
        <div className="w-full h-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col cursor-pointer">
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-3">
                Patients by Month
            </h3>
            <div className="flex-1 min-h-[0]">
                <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#6b7280", fontSize: 12 }}
                            axisLine={{ stroke: "#d1d5db" }}
                        />
                        <YAxis
                            allowDecimals={false}
                            tick={{ fill: "#6b7280", fontSize: 12 }}
                            axisLine={{ stroke: "#d1d5db" }}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="p-2 rounded-lg shadow-md border border-gray-200 bg-white/90 backdrop-blur-sm">
                                            <p className="text-sm font-semibold text-gray-800">{label}</p>
                                            <p className="text-sm text-gray-600">{`Patients: ${payload[0].value}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="patients" fill="#e68e0b" radius={[8, 8, 0, 0]} />
                    </ReBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChart;
