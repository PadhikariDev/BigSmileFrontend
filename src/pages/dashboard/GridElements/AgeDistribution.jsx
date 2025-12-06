import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const AgeDistribution = () => {
    const [patients, setPatients] = useState([]);
    const API = import.meta.env.VITE_BACKEND_URL;

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
                    setPatients(data.patients);
                }
            } catch (err) {
                console.error("Failed to fetch patients", err);
            }
        };
        fetchPatients();
    }, [API]);

    const children = patients.filter((p) => p.general.age < 13).length;
    const young = patients.filter((p) => p.general.age >= 13 && p.general.age <= 25).length;
    const adults = patients.filter((p) => p.general.age >= 26 && p.general.age <= 60).length;
    const seniors = patients.filter((p) => p.general.age > 60).length;

    const data = [
        { name: "Children", value: children },
        { name: "Young", value: young },
        { name: "Adults", value: adults },
        { name: "Seniors", value: seniors },
    ];

    const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"];

    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-center cursor-pointer">
            <h3 className="text-sm font-medium text-black uppercase mb-3">
                Age Distribution
            </h3>
            <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="35%"
                            outerRadius="60%"
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                            itemStyle={{ color: "#000" }}
                        />
                        <Legend
                            wrapperStyle={{ color: "#000", fontSize: "12px" }}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AgeDistribution;
