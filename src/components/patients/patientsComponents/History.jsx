import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const History = ({ formData, setFormData, handleCheckboxChange, handleFileChange, setActiveTab }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">History</h2>
            <form className="space-y-6">
                {/* Presenting Illness */}
                <div>
                    <Label>History of Presenting Illness</Label>
                    <Textarea
                        rows={3}
                        value={formData.history.presentingIllness}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                history: { ...prev.history, presentingIllness: e.target.value },
                            }))
                        }
                        placeholder="Describe presenting illness..."
                    />
                </div>

                {/* Medical History */}
                <div>
                    <Label>Medical History *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {[
                            "Allergy", "Hypertension", "Diabetes", "Cardiac disease", "Respiratory Disease",
                            "Renal Disease", "Major Surgery", "Communicable disease", "Gastrointestinal disease",
                            "Medication", "Osteoporosis / Gout / Arthritis", "Bleeding Disorder", "Neurological Disorder",
                            "Nothing Relevant Reported", "Other"
                        ].map((item) => (
                            <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                <Input
                                    type="checkbox"
                                    checked={formData.history.medicalHistory.includes(item)}
                                    onChange={() => handleCheckboxChange("history", "medicalHistory", item)}
                                    className="w-4 h-4"
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Medical Report */}
                <div>
                    <Label>Medical Report Photos / Documents</Label>
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        accept=".jpg,.png,.pdf"
                        className="mt-2 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Upload 1 supported file. Max 10 MB.
                    </p>
                </div>

                {/* Personal History */}
                <div>
                    <Label>Personal History *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {[
                            "Brushes once daily", "Brushes twice daily", "Rinse daily", "Smoking",
                            "Alcohol", "Chewing tobacco", "Bruxism", "Clinching", "Other"
                        ].map((item) => (
                            <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                <Input
                                    type="checkbox"
                                    checked={formData.history.personalHistory.includes(item)}
                                    onChange={() => handleCheckboxChange("history", "personalHistory", item)}
                                    className="w-4 h-4"
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Past Dental History */}
                <div>
                    <Label>Past Dental History</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {["Scaling", "Filling", "Braces", "Crown", "Implant", "Dentures", "Other"].map((item) => (
                            <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                <Input
                                    type="checkbox"
                                    checked={formData.history.pastDentalHistory.includes(item)}
                                    onChange={() => handleCheckboxChange("history", "pastDentalHistory", item)}
                                    className="w-4 h-4"
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Family History */}
                <div>
                    <Label>Family History</Label>
                    <Textarea
                        rows={3}
                        value={formData.history.familyHistory}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                history: { ...prev.history, familyHistory: e.target.value },
                            }))
                        }
                        placeholder="Enter family history..."
                    />
                </div>

                {/* Next button */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        onClick={() => setActiveTab("prescription")}
                        className="bg-[#d6810b] cursor-pointer hover:bg-[#e38d14] text-white px-6 py-2 rounded-xl text-sm"
                    >
                        Next →
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default History;
