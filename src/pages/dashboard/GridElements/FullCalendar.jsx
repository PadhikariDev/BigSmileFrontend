import React, { useState, useEffect } from "react";

// Nepali months
const nepaliMonths = [
    "बैशाख", "जेठ", "आषाढ", "श्रावण", "भाद्र", "आश्विन",
    "कार्तिक", "मंसिर", "पुष", "माघ", "फाल्गुण", "चैत्र"
];

// Nepali month lengths for 2082 BS
const nepaliMonthDays2082 = [31, 31, 32, 31, 31, 31, 29, 29, 30, 29, 30, 30];
// Days of the week
const weekDays = ["आइत", "सोम", "मङ्गल", "बुध", "बिहि", "शुक्र", "शनि"];

// Simple approximate AD to BS converter for 2082 BS
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

        if (day > nepaliMonthDays2082[month]) {
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

const FullCalendar = () => {
    const todayAD = new Date();
    const todayBS = convertADtoBS2082(todayAD);

    const [currentMonth, setCurrentMonth] = useState(todayBS.month);
    const [currentYear, setCurrentYear] = useState(todayBS.year);
    const [selectedDate, setSelectedDate] = useState(todayBS);

    // Days in current month
    const daysInMonth = nepaliMonthDays2082[currentMonth];

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

    const handleSelectDate = (day) => {
        setSelectedDate({ year: currentYear, month: currentMonth, day });
    };

    return (
        <div className="p-2 w-full max-w-sm bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <button
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={handlePrevMonth}
                >
                    {"<"}
                </button>
                <div className="font-bold text-center">
                    {nepaliMonths[currentMonth]} {currentYear}
                </div>
                <button
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={handleNextMonth}
                >
                    {">"}
                </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-xs font-medium text-center text-gray-700">
                {weekDays.map((d) => (
                    <div key={d} className="text-red-500">
                        {d}
                    </div>
                ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1 mt-1">
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                    const isToday =
                        d === todayBS.day &&
                        currentMonth === todayBS.month &&
                        currentYear === todayBS.year;
                    const isSelected =
                        d === selectedDate.day &&
                        currentMonth === selectedDate.month &&
                        currentYear === selectedDate.year;

                    return (
                        <button
                            key={d}
                            onClick={() => handleSelectDate(d)}
                            className={`p-2 rounded text-sm hover:bg-blue-200 ${isToday ? "bg-red-500 text-white" : ""
                                } `}
                        >
                            {d}
                        </button>
                    );
                })}
            </div>


        </div>
    );
};

export default FullCalendar;
