import type { AircraftStatus } from "../types/BriefFormTypes";

export function createDefaultStatus(type: AircraftStatus["status"]): AircraftStatus {
    switch (type) {
        case "Weather Green":
            return { status: "Weather Green", notes: "" };
        case "Weather Yellow":
            return { status: "Weather Yellow", notes: "" };
        case "Weather Red":
            return { status: "Weather Red", eta: "", notes: "" };
        case "On Mission":
            return { status: "On Mission", missionNumber: "", nextStep: "", notes: "" };
        case "Out of Service":
            return { status: "Out of Service", reason: "", rts: "", notes: "" };
        case "Response Delay":
            return { status: "Response Delay", delay: "", eta: "", notes: "" };
    }
}