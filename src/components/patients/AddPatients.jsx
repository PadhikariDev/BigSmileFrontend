import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faTooth,
    faTeeth,
    faRectangleList,
    faNotesMedical,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import General from "./patientsComponents/General";
import History from "./patientsComponents/History";
import Prescription from "./patientsComponents/Prescription";
import Evaluation from "./patientsComponents/Evaluation";
import TeethExamine from "./patientsComponents/TeethExamine";
import PatientsView from "./PatientsView";

const AddPatients = () => {
    const [patients, setPatients] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("general");
    const [medicalReportFile, setMedicalReportFile] = useState(null);
    const [prescription, setPrescription] = useState({
        selectedConditions: [],
        toothConditions: {},
    });
    const [toast, setToast] = useState(false);

    const API = import.meta.env.VITE_BACKEND_URL;
    const API_URL = `${API}/api/patients`;

    const token = localStorage.getItem("token"); // <-- use token for authenticated calls

    const initialFormData = {
        general: {
            opdNumber: "",
            visitType: "",
            date: "",
            referredBy: "",
            name: "",
            age: "",
            gender: "",
            address: "",
            phone: "",
            occupation: "",
            maritalStatus: "",
            facialAsymmetry: "",
            facialProfile: "",
            familyHistory: "",
            chiefComplaint: "",
        },
        history: {
            presentingIllness: "",
            medicalHistory: [],
            personalHistory: [],
            pastDentalHistory: [],
            familyHistory: "",
            medicalReport: "",
        },
        examine: {
            occlusal: {},
            decayed: {},
            mobility: {},
            permaTeeth: {},
            malocclusion: {},
            diagnosis: {},
            restorative: {},
            surgical: {},
            prosthetic: {},
        },
        evaluation: {
            muscleSides: {},
            tmjSides: {},
            nodeSides: {},
            occlusalSides: {},
        },
    };
    const [formData, setFormData] = useState(initialFormData);

    // --- Helpers ---
    const capitalizeWords = (str) =>
        str
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");

    const handleSearch = () => {
        if (!searchName.trim()) return setFiltered(patients);
        const formatted = capitalizeWords(searchName.trim());
        setFiltered(
            patients.filter((p) =>
                p.name.toLowerCase() === formatted.toLowerCase()
            )
        );
        setSearchName("");
    };

    const handleCheckboxChange = (tab, field, value) => {
        setFormData((prev) => {
            const arr = prev[tab][field];
            const newArr = arr.includes(value)
                ? arr.filter((v) => v !== value)
                : [...arr, value];
            return { ...prev, [tab]: { ...prev[tab], [field]: newArr } };
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setMedicalReportFile(file);
            setFormData((prev) => ({
                ...prev,
                history: { ...prev.history, medicalReport: file.name },
            }));
        }
    };

    const handleEvaluationChange = (section, data) => {
        setFormData((prev) => ({
            ...prev,
            evaluation: { ...prev.evaluation, [section]: data },
        }));
    };

    // --- Fetch Patients ---
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch(API_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // <-- include token
                    },
                });
                const data = await res.json();
                if (data.success) setPatients(data.patients);
            } catch (err) {
                console.error("Failed to fetch patients", err);
            }
        };
        fetchPatients();
    }, [API_URL, token]);

    useEffect(() => {
        setFiltered(patients);
    }, [patients]);

    // --- Final Submit ---
    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();

            for (const key in formData) {
                formDataToSend.append(key, JSON.stringify(formData[key]));
            }
            formDataToSend.append("prescription", JSON.stringify(prescription));

            if (medicalReportFile) {
                formDataToSend.append("medicalReport", medicalReportFile);
            }

            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // <-- include token
                },
                body: formDataToSend,
            });

            if (!res.ok) throw new Error("Failed to save patient");

            const data = await res.json();

            setPatients((prev) => [...prev, data.patient]);
            setFormData(initialFormData);
            setPrescription({ selectedConditions: [], toothConditions: {} });
            setMedicalReportFile(null);
            setOpen(false);

            setToast(true);
            setTimeout(() => setToast(false), 5000);
        } catch (err) {
            console.error(err);
            alert("Error saving patient. Check console.");
        }
    };

    return (
        <div className="space-y-5">
            {/* Search + Add */}
            <div className="flex flex-wrap items-center justify-end rounded-lg p-4 gap-3">
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gradient-to-r from-[#d27f0a] to-[#ea940c] rounded-md hover:from-[#ea940c] hover:to-[#f5a623] text-[#fffbfa] cursor-pointer"
                >
                    <FontAwesomeIcon icon={faPlus} /> Add Patient
                </button>
            </div>

            {/* Patient List Table */}
            <PatientsView patients={filtered} setPatients={setPatients} />

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#FFFCFB] w-5/6 max-w-6xl h-5/6 rounded-2xl shadow-2xl flex overflow-hidden">
                        {/* Sidebar */}
                        <aside className="w-1/4 bg-[#f8f9f0] text-black p-6 flex flex-col">
                            <h2 className="text-xl font-semibold mb-6">Patient Menu</h2>
                            <nav className="space-y-4">
                                {[
                                    { id: "general", icon: faUser, label: "General Info" },
                                    { id: "history", icon: faNotesMedical, label: "Medical History" },
                                    { id: "prescription", icon: faTeeth, label: "Gingival Examination" },
                                    { id: "examine", icon: faTooth, label: "Teeth Examine" },
                                    { id: "evaluation", icon: faRectangleList, label: "Evaluation" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition cursor-pointer ${activeTab === tab.id
                                                ? "bg-gradient-to-r from-[#d27f0a] to-[#ea940c] text-white"
                                                : "hover:bg-orange-100"
                                            }`}
                                    >
                                        <FontAwesomeIcon icon={tab.icon} /> {tab.label}
                                    </button>
                                ))}
                            </nav>
                            <div className="mt-auto pt-6 border-t border-gray-200 text-sm opacity-80">
                                © 2025 BigSmile Dental
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="flex-1 p-8 overflow-y-auto relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setOpen(false)}
                                className="absolute top-4 right-4 rounded-full hover:bg-gray-100"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </Button>

                            {activeTab === "general" && (
                                <General
                                    formData={formData}
                                    setFormData={setFormData}
                                    setActiveTab={setActiveTab}
                                />
                            )}
                            {activeTab === "history" && (
                                <History
                                    formData={formData}
                                    setFormData={setFormData}
                                    handleCheckboxChange={handleCheckboxChange}
                                    handleFileChange={handleFileChange}
                                    setActiveTab={setActiveTab}
                                />
                            )}
                            {activeTab === "prescription" && (
                                <Prescription
                                    prescription={prescription}
                                    setPrescription={setPrescription}
                                    setActiveTab={setActiveTab}
                                />
                            )}
                            {activeTab === "examine" && (
                                <TeethExamine
                                    data={formData.examine}
                                    onChange={(newData) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            examine: newData,
                                        }))
                                    }
                                    setActiveTab={setActiveTab}
                                />
                            )}
                            {activeTab === "evaluation" && (
                                <Evaluation
                                    data={formData.evaluation}
                                    onChange={handleEvaluationChange}
                                    handleSubmit={handleSubmit}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-72">
                    <span>✅ Patient added successfully!</span>
                    <button
                        onClick={() => setToast(false)}
                        className="ml-4 font-bold"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddPatients;
