// Prescription.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// Tooth button
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

const Prescription = ({ prescription, setPrescription, setActiveTab }) => {
    const conditions = [
        "Bleeding on Probing",
        "Swelling",
        "Hyperpigmentation",
        "Recession",
        "Periodontal pocket",
    ];

    // Temp selections
    const [tempConditions, setTempConditions] = useState([]);
    const [tempTeeth, setTempTeeth] = useState([]);

    // Toggle temp condition
    const toggleTempCondition = (condition) => {
        setTempConditions((prev) =>
            prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
        );
    };

    // Toggle temp tooth
    const handleTempToothClick = (tooth) => {
        setTempTeeth((prev) =>
            prev.includes(tooth) ? prev.filter(t => t !== tooth) : [...prev, tooth]
        );
    };

    // Apply temp → parent
    const handleApply = () => {
        if (!tempConditions.length || !tempTeeth.length) return;

        // Update toothConditions
        const updatedToothConditions = { ...prescription.toothConditions };
        tempTeeth.forEach(tooth => {
            updatedToothConditions[tooth] = Array.from(
                new Set([...(updatedToothConditions[tooth] || []), ...tempConditions])
            );
        });

        // Update selectedConditions
        const updatedSelectedConditions = Array.from(
            new Set([...prescription.selectedConditions, ...tempConditions])
        );

        setPrescription({
            toothConditions: updatedToothConditions,
            selectedConditions: updatedSelectedConditions,
        });

        // Clear temp
        setTempConditions([]);
        setTempTeeth([]);
    };

    // Clear temp only
    const handleClearTemp = () => {
        setTempConditions([]);
        setTempTeeth([]);
    };

    // Delete a tooth row
    const handleDeleteRow = (tooth) => {
        const updatedToothConditions = { ...prescription.toothConditions };
        delete updatedToothConditions[tooth];
        setPrescription({
            ...prescription,
            toothConditions: updatedToothConditions,
        });
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Gingival Examination</h2>

            {/* Condition Buttons */}
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
            <div className="relative w-full border border-gray-400 rounded-lg p-4 mb-4">
                {/* Cross lines */}
                <div className="absolute top-1/2 left-0 w-full border-t-2 border-gray-400"></div>
                <div className="absolute top-0 left-1/2 h-full border-l-2 border-gray-400"></div>

                <div className="grid grid-cols-2 divide-x divide-gray-300 gap-4">
                    {[
                        { name: "Upper Right", teeth: [18, 17, 16, 15, 14, 13, 12, 11] },
                        { name: "Upper Left", teeth: [21, 22, 23, 24, 25, 26, 27, 28] },
                        { name: "Lower Right", teeth: [48, 47, 46, 45, 44, 43, 42, 41] },
                        { name: "Lower Left", teeth: [31, 32, 33, 34, 35, 36, 37, 38] },
                    ].map((group, i) => (
                        <div key={i}>
                            <h3 className="font-medium mb-2">{group.name}</h3>
                            <div className="flex gap-2 flex-wrap">
                                {group.teeth.map((t) => (
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

            {/* Actions */}
            <div className="flex gap-3 mb-4">
                <Button
                    onClick={handleApply}
                    className="bg-[#67C090] hover:bg-[#67C090] text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                >
                    Apply
                </Button>
                <Button
                    onClick={handleClearTemp}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                >
                    Clear Selection
                </Button>
            </div>

            {/* Applied Conditions */}
            <div className="mb-6">
                <h4 className="font-medium mb-2 text-sm">Applied Conditions</h4>
                {Object.keys(prescription.toothConditions).length === 0 ? (
                    <p className="text-sm text-gray-500">No conditions applied</p>
                ) : (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {Object.entries(prescription.toothConditions).map(([tooth, conds]) => (
                            <li key={tooth} className="flex justify-between items-center">
                                <span>Tooth {tooth}: {conds.join(", ")}</span>
                                <button
                                    onClick={() => handleDeleteRow(tooth)}
                                    className="ml-2 hover:text-red-800 transition-all duration-300 cursor-pointer hover:scale-105 text-sm"
                                >
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
                <Button
                    type="button"
                    onClick={() => setActiveTab("examine")}
                    className="bg-[#d6810b] cursor-pointer hover:bg-[#e38d14] text-white px-6 py-2 rounded-xl text-sm"
                >
                    Next →
                </Button>
            </div>
        </div>
    );
};

export default Prescription;
