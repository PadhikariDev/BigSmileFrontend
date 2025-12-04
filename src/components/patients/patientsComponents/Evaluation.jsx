import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// 🔹 Reusable Evaluation Section
const EvaluationSection = ({ title, conditions, options, data = {}, onChange }) => {
    const [tempConditions, setTempConditions] = useState([]);
    const [tempOptions, setTempOptions] = useState([]);

    // ✅ Toggle condition
    const toggleTempCondition = (condition) => {
        setTempConditions(prev =>
            prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
        );
    };

    // ✅ Toggle option
    const toggleTempOption = (option) => {
        setTempOptions(prev =>
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        );
    };

    // ✅ Apply selection
    const handleApply = () => {
        if (tempConditions.length === 0 || tempOptions.length === 0) return;

        const updated = { ...data };
        tempOptions.forEach(option => {
            updated[option] = Array.from(new Set([...(updated[option] || []), ...tempConditions]));
        });

        onChange(updated);
        setTempConditions([]);
        setTempOptions([]);
    };

    // ✅ Clear temp
    const handleClearTemp = () => {
        setTempConditions([]);
        setTempOptions([]);
    };

    // ✅ Delete applied row
    const handleDeleteRow = (option) => {
        const updated = { ...data };
        delete updated[option];
        onChange(updated);
    };

    return (
        <div className="mb-6 border border-gray-300 rounded-lg p-3">
            <h3 className="font-medium mb-2 text-sm">{title}</h3>

            {/* Conditions */}
            <div className="mb-3">
                <h4 className="font-medium text-xs mb-1">Select Conditions</h4>
                <div className="flex gap-2 flex-wrap">
                    {conditions.map(condition => (
                        <button
                            key={condition}
                            onClick={() => toggleTempCondition(condition)}
                            className={`px-3 py-1 rounded-md border text-sm transition ${tempConditions.includes(condition)
                                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 cursor-pointer"
                                : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                }`}
                        >
                            {condition}
                        </button>
                    ))}
                </div>
            </div>

            {/* Options */}
            <div className="mb-3">
                <h4 className="font-medium text-xs mb-1">Select Options</h4>
                <div className="flex gap-2 flex-wrap">
                    {options.map(option => (
                        <button
                            key={option}
                            onClick={() => toggleTempOption(option)}
                            className={`px-3 py-1 rounded-md border text-sm transition ${tempOptions.includes(option)
                                ? "bg-[#F97A00] text-white cursor-pointer " : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-3">
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
                    Clear
                </Button>
            </div>

            {/* Applied Rows */}
            <div>
                <h4 className="font-medium mb-2 text-sm">Applied:</h4>
                {Object.keys(data).length === 0 ? (
                    <p className="text-xs text-gray-500">No conditions applied</p>
                ) : (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {Object.entries(data).map(([option, conds]) => (
                            <li key={option} className="flex justify-between items-center">
                                <span>
                                    {option}: {conds.join(", ")}
                                </span>
                                <button
                                    onClick={() => handleDeleteRow(option)}
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

// 🔹 Main Evaluation Component
const Evaluation = ({ data, onChange, handleSubmit }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Evaluation</h2>

            <EvaluationSection
                title="1. Muscle Tenderness"
                conditions={["Masseter", "Temporalis", "Medial Pterygoid", "Lateral Pterygoid", "Sternocleidomastoid", "Cervical muscle"]}
                options={["No", "Left", "Right"]}
                data={data.muscleSides}
                onChange={(updated) => onChange("muscleSides", updated)}
            />

            <EvaluationSection
                title="2. TMJ Examination"
                conditions={["Pain", "Clicking", "Crepitus", "Popping"]}
                options={["No", "Left", "Right"]}
                data={data.tmjSides}
                onChange={(updated) => onChange("tmjSides", updated)}
            />

            <EvaluationSection
                title="3. Lymph Node"
                conditions={["Submental", "Submandibular", "Pre-auricular", "Post-auricular", "Cervical"]}
                options={["Left Palpable", "Left Tenderness", "Right Palpable", "Right Tender"]}
                data={data.nodeSides}
                onChange={(updated) => onChange("nodeSides", updated)}
            />

            <EvaluationSection
                title="4. Occlusal Relationship"
                conditions={["Right Molar", "Left Molar", "Right Canine", "Left Canine", "Anterior"]}
                options={["Class I", "Class II", "Class III"]}
                data={data.occlusalSides}
                onChange={(updated) => onChange("occlusalSides", updated)}
            />

            {/* Submit */}
            <div className="flex justify-end mt-4">
                <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-sm cursor-pointer"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Evaluation;
