interface WeatherGreenStatus {
    status: "Weather Green";
    notes: string;
}

interface WeatherYellowStatus {
    status: "Weather Yellow";
    notes: string;
}

interface WeatherRedStatus {
    status: "Weather Red";
    eta: string;
    notes: string;
}

interface OnMissionStatus {
    status: "On Mission";
    missionNumber: string;
    nextStep: string;
    notes: string;
}

interface OutOfServiceStatus {
    status: "Out of Service";
    reason: string;
    rts: string;
    notes: string;
}

interface ResponseDelayStatus {
    status: "Response Delay";
    delay: string;
    eta: string;
    notes: string;
}

export type AircraftStatus =
    | WeatherGreenStatus
    | WeatherYellowStatus
    | WeatherRedStatus
    | OnMissionStatus
    | OutOfServiceStatus
    | ResponseDelayStatus;

export interface BackendAircraft {
    name: string;
    type: "rotor" | "plane";
    base: string;
}

export interface AircraftInfo {
    name: string;
    location: string;
    status: AircraftStatus;
}

export interface PendingRequest {
    missionNumber: string;
    waitReason: string;
}

export interface BriefForm {
    personnel: string[];
    date: Date | null | undefined;
    aircraftInfo: AircraftInfo[];
    pendingRequests: PendingRequest[];
    nicuNotes: string | null | undefined;
    scheduledTransportNotes: string | null | undefined;
    deviceStatusNotes: string | null | undefined;
    otherNotes: string | null | undefined;
}

export interface BriefStore {
    form: BriefForm;

    updateSlice: <K extends keyof BriefForm>(
        key: K,
        value: BriefForm[K]
    ) => void;

    updateNested: <K extends keyof BriefForm>(
        key: K,
        index: number,
        value: BriefForm[K] extends Array<infer U> ? U : never
    ) => void;

    initializeAircraft: (aircraftList: BackendAircraft[]) => void; 
}
