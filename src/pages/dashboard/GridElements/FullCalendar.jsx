import React, { useState } from "react";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const FullCalendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    // Total days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Weekday of 1st day of the month (0=Sun, 1=Mon, …)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const handlePrevMonth = () => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    // Generate calendar days with empty slots for first day alignment
    const calendarDays = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
        <div className="p-3 w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-black/20 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <button
                    className="px-3 py-1 rounded bg-black/10 hover:bg-black/20 text-black"
                    onClick={handlePrevMonth}
                >
                    &lt;
                </button>
                <div className="font-bold text-center text-black">
                    {months[currentMonth]} {currentYear}
                </div>
                <button
                    className="px-3 py-1 rounded bg-black/10 hover:bg-black/20 text-black"
                    onClick={handleNextMonth}
                >
                    &gt;
                </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-xs font-semibold text-center text-black/80 mb-1">
                {weekDays.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1 flex-1">
                {calendarDays.map((day, index) => {
                    if (day === null) return <div key={index} />; // empty slot

                    const isToday =
                        day === today.getDate() &&
                        currentMonth === today.getMonth() &&
                        currentYear === today.getFullYear();

                    return (
                        <button
                            key={index}
                            disabled
                            className={`p-1 flex items-center justify-center text-sm rounded-full
                                ${isToday ? "bg-red-500 text-white w-7 h-7 text-xs" : ""}
                                ${!isToday ? "text-black/90" : ""}
                            `}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FullCalendar;
