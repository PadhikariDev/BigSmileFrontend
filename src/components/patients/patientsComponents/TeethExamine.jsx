import React from "react";
import { Button } from "@/components/ui/button";
import Occlusal from "../patientsComponents/teethExamination/Occlusal";
import Decayed from "./teethExamination/Decayed";
import Mobility from "./teethExamination/Mobility";
import PermaTeeth from "./teethExamination/PermaTeeth";
import Malocclusion from "./teethExamination/Malocclusion";
import TeethDiagnosis from "./teethExamination/TeethDiagnosis";
import Restorative from "./teethExamination/Restorative";
import Surgical from "./teethExamination/Surgical";
import Prosthetic from "./teethExamination/Prosthetic";

const TeethExamine = ({ data, onChange, setActiveTab }) => {
    // helper: update one subsection
    const updateSection = (section, newData) => {
        onChange({
            ...data,
            [section]: newData,
        });
    };

    return (
        <div>
            <Occlusal
                data={data.occlusal}
                onChange={(newData) => updateSection("occlusal", newData)}
            />
            <Decayed
                data={data.decayed}
                onChange={(newData) => updateSection("decayed", newData)}
            />
            <Mobility
                data={data.mobility}
                onChange={(newData) => updateSection("mobility", newData)}
            />
            <PermaTeeth
                data={data.permaTeeth}
                onChange={(newData) => updateSection("permaTeeth", newData)}
            />
            <Malocclusion
                data={data.malocclusion}
                onChange={(newData) => updateSection("malocclusion", newData)}
            />
            <TeethDiagnosis
                data={data.diagnosis}
                onChange={(newData) => updateSection("diagnosis", newData)}
            />
            <Restorative
                data={data.restorative}
                onChange={(newData) => updateSection("restorative", newData)}
            />
            <Surgical
                data={data.surgical}
                onChange={(newData) => updateSection("surgical", newData)}
            />
            <Prosthetic
                data={data.prosthetic}
                onChange={(newData) => updateSection("prosthetic", newData)}
            />

            {/* Next Button */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    onClick={() => setActiveTab("evaluation")}
                    className="bg-[#d6810b] cursor-pointer hover:bg-[#e38d14] text-white px-6 py-2 rounded-xl text-sm"
                >
                    Next →
                </Button>
            </div>
        </div>
    );
};

export default TeethExamine;
