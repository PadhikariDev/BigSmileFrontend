import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// 🦷 Tooth component
const Tooth = ({ num, selected, onClick }) => {
    return (
        <button
            type="button"
            className={`w-8 h-8 flex items-center justify-center border rounded transition
                ${selected ? "bg-[#F97A00] text-white cursor-pointer " : "bg-gray-100 hover:bg-gray-200 cursor-pointer"}`}
            onClick={() => onClick(num)}
        >
            {num}
        </button>
    );
};

const Surgical = ({ data = {}, onChange }) => {
    const [conditions] = useState([
        "Extraction",
        "Surgical Extraction",
        "Gingivoplasty",
        "Gingivectomy",
        "Frenectomy",
        "Alveolectomy/ Osteoplasty"
    ]);

    // Temporary selections (staging before apply)
    const [tempConditions, setTempConditions] = useState([]);
    const [tempTeeth, setTempTeeth] = useState([]);

    // ✅ Toggle condition in temp
    const toggleTempCondition = (condition) => {
        setTempConditions((prev) =>
            prev.includes(condition)
                ? prev.filter((c) => c !== condition)
                : [...prev, condition]
        );
    };

    // ✅ Toggle tooth in temp
    const handleTempToothClick = (tooth) => {
        setTempTeeth((prev) =>
            prev.includes(tooth)
                ? prev.filter((t) => t !== tooth)
                : [...prev, tooth]
        );
    };

    // ✅ Apply selected conditions → commit to parent state
    const handleApply = () => {
        if (tempConditions.length === 0 || tempTeeth.length === 0) return;

        const updated = { ...data };
        tempTeeth.forEach((tooth) => {
            updated[tooth] = tempConditions;
        });

        onChange(updated);

        // Clear temp after applying
        setTempConditions([]);
        setTempTeeth([]);
    };

    // ✅ Clear only temp (not applied)
    const handleClearTemp = () => {
        setTempConditions([]);
        setTempTeeth([]);
    };

    // ✅ Remove applied condition for a specific tooth
    const handleRemove = (tooth) => {
        const updated = { ...data };
        delete updated[tooth];
        onChange(updated);
    };

    return (
        <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">
                8. Surgical Treatment Plan for Specific Teeth
            </h2>

            {/* Temporary Condition Selection */}
            <div className="flex gap-2 mb-4 flex-wrap">
                {conditions.map((condition) => (
                    <button
                        key={condition}
                        type="button"
                        onClick={() => toggleTempCondition(condition)}
                        className={`px-4 py-2 rounded-lg border transition ${tempConditions.includes(condition)
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 cursor-pointer"
                            : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            }`}
                    >
                        {condition}
                    </button>
                ))}
            </div>

            {/* Teeth Grid */}
            <div className="relative w-full border border-gray-400 rounded-lg p-4">
                {/* Cross lines */}
                <div className="absolute top-1/2 left-0 w-full border-t-2 border-gray-400"></div>
                <div className="absolute top-0 left-1/2 h-full border-l-2 border-gray-400"></div>

                <div className="grid grid-cols-2 divide-x divide-gray-300 gap-4">
                    {[
                        { name: "Upper Right", teeth: [18, 17, 16, 15, 14, 13, 12, 11] },
                        { name: "Upper Left", teeth: [21, 22, 23, 24, 25, 26, 27, 28] },
                        { name: "Lower Right", teeth: [48, 47, 46, 45, 44, 43, 42, 41] },
                        { name: "Lower Left", teeth: [31, 32, 33, 34, 35, 36, 37, 38] },
                    ].map((q, i) => (
                        <div key={i}>
                            <h3 className="font-medium mb-2">{q.name}</h3>
                            <div className="flex gap-2 flex-wrap">
                                {q.teeth.map((t) => (
                                    <Tooth
                                        key={t}
                                        num={t}
                                        selected={tempTeeth.includes(t)}
                                        onClick={handleTempToothClick}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Temporary Actions */}
            <div className="flex gap-3 mt-4">
                <Button
                    type="button"
                    onClick={handleApply}
                    className="bg-[#67C090] hover:bg-[#67C090] text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                >
                    Apply
                </Button>
                <Button
                    type="button"
                    onClick={handleClearTemp}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                >
                    Clear Selection
                </Button>
            </div>

            {/* Final Applied Conditions */}
            <div className="mt-6">
                <h3 className="font-medium mb-2">Applied Conditions:</h3>
                {Object.keys(data).length === 0 ? (
                    <p className="text-sm text-gray-500">No conditions applied</p>
                ) : (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {Object.entries(data).map(([tooth, conds]) => (
                            <li key={tooth} className="flex items-center justify-between">
                                <span>
                                    Tooth {tooth}: {conds.join(", ")}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(tooth)}
                                    className="ml-2 hover:text-red-800 transition-all duration-300 cursor-pointer hover:scale-105 text-sm"
                                >
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Surgical;
