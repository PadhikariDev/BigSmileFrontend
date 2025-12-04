import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import jsPDF from "jspdf"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import pdfBG from "../../assets/bg.jpg"

const PatientsView = ({ patients, setPatients }) => {
    const [search, setSearch] = useState("")
    const [genderFilter, setGenderFilter] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: "opdNumber", direction: "desc" })
    const [page, setPage] = useState(1)

    const [selectedPatient, setSelectedPatient] = useState(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    // Fetch patients
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/patients")
                const data = await res.json()
                if (data.success) {
                    setPatients(
                        data.patients.sort(
                            (a, b) => new Date(b.general.date) - new Date(a.general.date)
                        )
                    )
                }
            } catch (err) {
                console.error("Failed to fetch patients", err)
            }
        }
        fetchPatients()
    }, [])

    // Filter + search
    const filteredPatients = patients.filter((p) => {
        const nameMatch = p.general.name
            ? p.general.name.toLowerCase().includes(search.toLowerCase())
            : false

        const genderMatch = genderFilter
            ? p.general.gender && p.general.gender.toLowerCase() === genderFilter.toLowerCase()
            : true

        return nameMatch && genderMatch
    })

    // Sorting
    const sortedPatients = [...filteredPatients].sort((a, b) => {
        const key = sortConfig.key
        let aVal = a.general[key] || a[key]
        let bVal = b.general[key] || b[key]

        if (key === "date") {
            aVal = new Date(a.general.date)
            bVal = new Date(b.general.date)
        } else {
            if (typeof aVal === "string") aVal = aVal.toLowerCase()
            if (typeof bVal === "string") bVal = bVal.toLowerCase()
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
        return 0
    })

    // Pagination
    const itemsPerPage = 10
    const totalPages = Math.ceil(sortedPatients.length / itemsPerPage)
    const paginatedPatients = sortedPatients.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    )

    // Toggle sort
    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }))
    }

    // Format nested objects for display
    const renderDetails = (obj) => {
        if (!obj || typeof obj !== "object") return null
        return (
            <div className="ml-4 space-y-1">
                {Object.entries(obj).map(([k, v]) => (
                    <div key={k}>
                        <span className="font-medium capitalize">{k}:</span>{" "}
                        {typeof v === "object" ? JSON.stringify(v) : String(v)}
                    </div>
                ))}
            </div>
        )
    }

    // PDF download
    const downloadPDF = (patient) => {
        const doc = new jsPDF();
        const bgImg = new Image();
        bgImg.src = pdfBG;

        let yStart = 30; // starting Y after title

        bgImg.onload = () => {
            // Add clinic background on first page
            doc.addImage(bgImg, "JPEG", 0, 0, 210, 297);

            let y = yStart;

            const addSection = (title, data) => {
                if (!data) return;

                // Section title
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.text(title, 25, y);
                y += 10;

                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);

                Object.entries(data).forEach(([k, v]) => {
                    // Skip empty fields
                    if (
                        v === null ||
                        v === undefined ||
                        (typeof v === "string" && v.trim() === "") ||
                        (Array.isArray(v) && v.length === 0) ||
                        (typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0)
                    ) return;

                    let value = Array.isArray(v)
                        ? v.join(", ")
                        : typeof v === "object"
                            ? JSON.stringify(v)
                            : v;

                    doc.text(`${k}: ${value}`, 25, y);
                    y += 6;

                    // Add new page if we exceed page height
                    if (y > 280) {
                        doc.addPage();
                        doc.addImage(bgImg, "JPEG", 0, 0, 210, 297);
                        y = yStart;
                    }
                });

                y += 4; // spacing after section
            };

            addSection("General", patient.general);
            addSection("History", patient.history);
            addSection("Prescription", patient.prescription);
            addSection("Evaluation", patient.evaluation);
            addSection("Examine", patient.examine);

            // Add medical report image if exists
            if (patient.history.medicalReport) {
                const reportImg = new Image();
                reportImg.crossOrigin = "anonymous"; // for server images
                reportImg.src = `http://localhost:5000/${patient.history.medicalReport}`;

                reportImg.onload = () => {
                    // Add image below the previous content
                    if (y + 60 > 280) {
                        doc.addPage();
                        doc.addImage(bgImg, "JPEG", 0, 0, 210, 297);
                        y = yStart;
                    }
                    doc.text("Medical Report:", 25, y);
                    y += 6;
                    doc.addImage(reportImg, "JPEG", 25, y, 60, 60);
                    y += 65;

                    doc.save(`${patient.general.name}_details.pdf`);
                };

                reportImg.onerror = () => {
                    console.warn("Failed to load medical report image.");
                    doc.save(`${patient.general.name}_details.pdf`);
                };
            } else {
                doc.save(`${patient.general.name}_details.pdf`);
            }
        };
    };

    //excel download
    const downloadExcel = (patient) => {
        const data = [];

        const addSection = (title, obj) => {
            data.push({ Section: title, Field: "", Value: "" });
            Object.entries(obj || {}).forEach(([key, value]) => {
                data.push({ Section: "", Field: key, Value: JSON.stringify(value) });
            });
        };

        addSection("General", patient.general);
        addSection("History", patient.history);
        addSection("Prescription", patient.prescription);
        addSection("Evaluation", patient.evaluation);
        addSection("Examine", patient.examine);

        const worksheet = XLSX.utils.json_to_sheet(data);
        worksheet["!cols"] = [{ wch: 20 }, { wch: 30 }, { wch: 50 }]; // wider columns

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Patient");

        const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${patient.general.name}_details.xlsx`);
    };


    // Delete patient
    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/api/patients/${selectedPatient._id}`, {
                method: "DELETE",
            })
            setPatients((prev) =>
                prev.filter((p) => p._id !== selectedPatient._id)
            )
            setIsDeleteOpen(false)
        } catch (err) {
            console.error("Failed to delete patient", err)
        }
    }

    return (
        <div className="mt-6 bg-gray-50 p-4 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Patient List</h2>

            {/* Search + Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
                <Input
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {genderFilter || "Filter by Gender"}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setGenderFilter("")}>
                            All
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setGenderFilter("Male")}>
                            Male
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setGenderFilter("Female")}>
                            Female
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gradient-to-r from-orange-100 to-orange-200 text-gray-700">
                        <tr>
                            {["opdNumber", "date", "name", "age", "gender", "phone", "address"].map(
                                (col) => (
                                    <th
                                        key={col}
                                        onClick={() => handleSort(col)}
                                        className="px-4 py-3 cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-1">
                                            {col.toUpperCase()}
                                            {sortConfig.key === col &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                ))}
                                        </div>
                                    </th>
                                )
                            )}
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginatedPatients.map((patient, idx) => (
                            <tr
                                key={patient._id}
                                className={
                                    idx % 2 === 0
                                        ? "bg-white hover:bg-orange-50"
                                        : "bg-gray-50 hover:bg-orange-50"
                                }
                            >
                                <td className="px-4 py-2">{patient.general.opdNumber}</td>
                                <td className="px-4 py-2">
                                    {new Date(patient.general.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">{patient.general.name}</td>
                                <td className="px-4 py-2">{patient.general.age}</td>
                                <td className="px-4 py-2">{patient.general.gender}</td>
                                <td className="px-4 py-2">{patient.general.phone}</td>
                                <td className="px-4 py-2">{patient.general.address}</td>
                                <td className="px-4 py-2 text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setSelectedPatient(patient)
                                                    setIsDetailsOpen(true)
                                                }}
                                            >
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => downloadPDF(patient)}>
                                                Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => downloadExcel(patient)}>
                                                Download as Excel
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setSelectedPatient(patient)
                                                    setIsDeleteOpen(true)
                                                }}
                                            >
                                                Remove
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                    <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                        Prev
                    </Button>
                    <Button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* View Details Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Patient Details</DialogTitle>
                    </DialogHeader>
                    {selectedPatient && (
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="font-bold text-gray-700">General</h3>
                                {renderDetails(selectedPatient.general)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-700">History</h3>
                                {renderDetails(selectedPatient.history)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-700">Prescription</h3>
                                {renderDetails(selectedPatient.prescription)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-700">Evaluation</h3>
                                {renderDetails(selectedPatient.evaluation)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-700">Examine</h3>
                                {renderDetails(selectedPatient.examine)}
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => downloadPDF(selectedPatient)}>
                            Download PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">
                        Do you really wanna delete? You may lose it permanently.
                    </p>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleDelete}>
                            Yes, Delete
                        </Button>
                        <Button onClick={() => setIsDeleteOpen(false)}>No</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PatientsView
