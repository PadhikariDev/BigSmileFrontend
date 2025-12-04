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

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/patients");
                const data = await res.json();

                if (data.success && Array.isArray(data.patients)) {
                    setPatients(data.patients); // update state
                    console.log("Fetched patients:", data.patients); // log the fetched data directly
                }
            } catch (err) {
                console.error("Failed to fetch patients", err);
            }
        };

        fetchPatients();
    }, []);

    // All 12 months
    const months = [
        "बैशाख",
        "जेठ",
        "आषाढ",
        "श्रावण",
        "भाद्र",
        "आश्विन",
        "कार्तिक",
        "मंसिर",
        "पुष",
        "माघ",
        "फाल्गुण",
        "चैत्र"
    ];

    // Count patients per month using general.date
    const nepaliMonthDays = [31, 31, 32, 31, 31, 31, 29, 29, 30, 29, 30, 30];

    const convertADtoBS2082 = (adDate) => {
        const startBS = { year: 2082, month: 0, day: 1 }; // 1 बैशाख 2082 BS
        const startAD = new Date("2025-04-13"); // 1 बैशाख 2082 BS ~ 13 April 2025 AD

        // Calculate total days difference
        let diffDays = Math.floor((adDate - startAD) / (1000 * 60 * 60 * 24));

        let year = startBS.year;
        let month = startBS.month;
        let day = startBS.day;

        while (diffDays > 0) {
            day++;
            diffDays--;

            if (day > nepaliMonthDays[month]) {
                day = 1;
                month++;
                if (month > 11) {
                    month = 0;
                    year++;
                }
            }
        }

        return { year, month, day };
    };

    // Count patients by Nepali month
    const monthlyCounts = Array(12).fill(0);
    patients.forEach(p => {
        if (p.general?.date) {
            const adDate = new Date(p.general.date);
            if (!isNaN(adDate)) {
                const bsDate = convertADtoBS2082(adDate);
                monthlyCounts[bsDate.month]++; // increment the corresponding Nepali month
            }
        }
    });

    const chartData = months.map((month, index) => ({
        month,
        patients: monthlyCounts[index],
    }));

    return (
        <div className="w-full h-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col   cursor-pointer">
            <h3 className="text-sm font-bold text-gray-500  uppercase mb-4">
                Patients by Month
            </h3>
            <div className="flex-1 min-h-[210px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={chartData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>

                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className=" p-3 rounded-lg shadow-lg border border-gray-200">
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
