import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, User, Phone } from "lucide-react";

const General = ({ formData, setFormData, setActiveTab }) => {
    const [errors, setErrors] = useState({});

    const requiredFields = [
        "opdNumber",
        "visitType",
        "date",
        "name",
        "age",
        "gender",
        "address",
        "phone",
        "chiefComplaint",
    ];

    const validate = () => {
        let newErrors = {};

        requiredFields.forEach((field) => {
            if (!formData.general[field] || formData.general[field].trim() === "") {
                newErrors[field] = true;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const goNext = () => {
        if (validate()) {
            setActiveTab("history");
        }
    };

    const fieldError = (field) =>
        errors[field] ? "border-red-500 focus-visible:ring-red-500" : "";

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">General Info</h2>

            <Card className="max-w-4xl mx-auto shadow-lg border border-gray-200">
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* OPD Number */}
                        <div className="space-y-2">
                            <Label>OPD Number *</Label>
                            <Input
                                value={formData.general.opdNumber}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, opdNumber: e.target.value },
                                    }))
                                }
                                className={fieldError("opdNumber")}
                            />
                        </div>

                        {/* Visit Type */}
                        <div className="space-y-2">
                            <Label>Visit Type *</Label>
                            <Select
                                value={formData.general.visitType}
                                onValueChange={(val) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, visitType: val },
                                    }))
                                }
                            >
                                <SelectTrigger className={fieldError("visitType")}>
                                    <SelectValue placeholder="Select visit type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="first">First Visit</SelectItem>
                                    <SelectItem value="followup">Follow Up</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <Label>Date *</Label>
                            <div
                                className={`flex items-center border rounded-md px-3 ${fieldError(
                                    "date"
                                )}`}
                            >
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                <Input
                                    type="date"
                                    value={formData.general.date}
                                    onChange={(e) => {
                                        const formatted = new Date(e.target.value)
                                            .toISOString()
                                            .split("T")[0];
                                        setFormData((p) => ({
                                            ...p,
                                            general: { ...p.general, date: e.target.value },
                                        }))
                                    }}
                                    className="border-0 p-0 focus-visible:ring-0"
                                />
                            </div>
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                            <Label>Name *</Label>
                            <div
                                className={`flex items-center border rounded-md px-3 ${fieldError(
                                    "name"
                                )}`}
                            >
                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                <Input
                                    value={formData.general.name}
                                    onChange={(e) =>
                                        setFormData((p) => ({
                                            ...p,
                                            general: { ...p.general, name: e.target.value },
                                        }))
                                    }
                                    placeholder="Enter full name"
                                    className="border-0 p-0 focus-visible:ring-0"
                                />
                            </div>
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <Label>Age *</Label>
                            <Input
                                type="number"
                                value={formData.general.age}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, age: e.target.value },
                                    }))
                                }
                                className={fieldError("age")}
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <Label>Gender *</Label>
                            <Select
                                value={formData.general.gender}
                                onValueChange={(val) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, gender: val },
                                    }))
                                }
                            >
                                <SelectTrigger className={fieldError("gender")}>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label>Address *</Label>
                            <Textarea
                                rows={2}
                                value={formData.general.address}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, address: e.target.value },
                                    }))
                                }
                                className={fieldError("address")}
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label>Phone Number *</Label>
                            <div
                                className={`flex items-center border rounded-md px-3 ${fieldError(
                                    "phone"
                                )}`}
                            >
                                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                <Input
                                    type="tel"
                                    value={formData.general.phone}
                                    onChange={(e) =>
                                        setFormData((p) => ({
                                            ...p,
                                            general: { ...p.general, phone: e.target.value },
                                        }))
                                    }
                                    className="border-0 p-0 focus-visible:ring-0"
                                />
                            </div>
                        </div>

                        {/* Occupation */}
                        <div className="space-y-2">
                            <Label>Occupation</Label>
                            <Input
                                value={formData.general.occupation}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, occupation: e.target.value },
                                    }))
                                }
                            />
                        </div>

                        {/* Marital Status */}
                        <div className="space-y-2">
                            <Label>Marital Status</Label>
                            <Select
                                value={formData.general.maritalStatus}
                                onValueChange={(val) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, maritalStatus: val },
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select marital status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="unmarried">Unmarried</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Facial Asymmetry */}
                        <div className="space-y-2">
                            <Label>Facial Asymmetry</Label>
                            <Select
                                value={formData.general.facialAsymmetry}
                                onValueChange={(val) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, facialAsymmetry: val },
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="symmetrical">Symmetrical</SelectItem>
                                    <SelectItem value="asymmetrical">Asymmetrical</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Facial Profile */}
                        <div className="space-y-2">
                            <Label>Facial Profile</Label>
                            <Select
                                value={formData.general.facialProfile}
                                onValueChange={(val) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, facialProfile: val },
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select profile" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="straight">Straight</SelectItem>
                                    <SelectItem value="convex">Convex</SelectItem>
                                    <SelectItem value="concave">Concave</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Family History */}
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <Label>Family History</Label>
                            <Textarea
                                rows={3}
                                value={formData.general.familyHistory}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: { ...p.general, familyHistory: e.target.value },
                                    }))
                                }
                            />
                        </div>

                        {/* Chief Complaint */}
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <Label>Chief Complaint *</Label>
                            <Textarea
                                rows={3}
                                value={formData.general.chiefComplaint}
                                onChange={(e) =>
                                    setFormData((p) => ({
                                        ...p,
                                        general: {
                                            ...p.general,
                                            chiefComplaint: e.target.value,
                                        },
                                    }))
                                }
                                className={fieldError("chiefComplaint")}
                            />
                        </div>

                        {/* Next Button */}
                        <div className="col-span-1 md:col-span-2 flex justify-end">
                            <Button
                                type="button"
                                onClick={goNext}
                                className="bg-[#d6810b] hover:bg-[#e38d14] text-white px-6"
                            >
                                Next →
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default General;
