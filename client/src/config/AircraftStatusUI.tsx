import type { JSX } from "react";
import type { FieldDef } from "../components/FieldsetDetails";
import type { AircraftStatus } from "../types/BriefFormTypes";

export interface StatusUIItem {
    color: string;
    subtitle: JSX.Element;
    fields: FieldDef[];
}

export const statusUI: Record<AircraftStatus['status'], StatusUIItem> = {
    "Weather Green": {
        color: "#26AF4C",
        subtitle: (
            <div className="AircraftSubtitle">
                Weather <span style={{ color: "#26AF4C" }}>Green</span>
            </div>
        ),
        fields: [
            {
                key: "notes",
                label: "Notes",
                type: "textarea",
                placeholder: "ex. Will have a late medic @ 0030.",
            },
        ]
    },

    "Weather Yellow": {
        color: "#FED701",
        subtitle: (
            <div className="AircraftSubtitle">
                Weather <span style={{ color: "#FED701" }}>Yellow</span>
            </div>
        ),
        fields: [
            {
                key: "notes",
                label: "Notes",
                type: "textarea",
                placeholder: "ex. Will have a late nurse @ 2130.",
            },
        ]
    },

    "Weather Red": {
        color: "#FC3533",
        subtitle: (
            <div className="AircraftSubtitle">
                Weather <span style={{ color: "#FC3533" }}>Red</span>
            </div>
        ),
        fields: [
            {
                key: "eta",
                label: "Wx ETA",
                type: "input",
                placeholder: "ex. 1610 for potential wx improvement",
            },
            {
                key: "notes",
                label: "Notes",
                type: "textarea",
                placeholder: "ex. Repositioned to airport for weather.",
            },
        ]
    },

    "On Mission": {
        color: "#1A2878",
        subtitle: (
            <div className="AircraftSubtitle">
                On Mission
            </div>
        ),
        fields: [
            {
                key: "missionNumber",
                label: "Mission #",
                type: "input",
                placeholder: "ex. 25-12345",
            },
            {
                key: "nextStep",
                label: "Next Step",
                type: "input",
                placeholder: "ex. En route sending",
            },
            {
                key: "notes",
                label: "Notes",
                type: "textarea",
                placeholder: "ex. MTX from 2130 to 2000.",
            },
        ]
    },

    "Out of Service": {
        color: "#686868",
        subtitle: (
            <div className="AircraftSubtitle">
                Out of Service
            </div>
        ),
        fields: [
            {
                key: "reason",
                label: "Reason",
                type: "input",
                placeholder: "ex. Scheduled Maintenance",
            },
            {
                key: "rts",
                label: "Est. RTS",
                type: "input",
                placeholder: "ex. 2100",
            },
            {
                key: "notes",
                label: "Notes",
                type: "textarea",
                placeholder: "ex. Base OOS. Flights diverted to KAMA.",
            },
        ]
    },

    "Response Delay": {
        color: "#7D5CFF",
        subtitle: (
            <div className="AircraftSubtitle">
                Response Delay
            </div>
        ),
        fields: [
            {
                key: "delay",
                label: "Delay",
                type: "input",
                placeholder: "ex. Refilling oxygen at KTDW",
            },
            {
                key: "eta",
                label: "Est. RTS",
                type: "input",
                placeholder: "ex. 1510",
            },
            {
                key: "notes",
                label: "Notes",
                type: "textarea",
                placeholder: "ex. Crew rest ends 2133.",
            },
        ]
    }
} as const;