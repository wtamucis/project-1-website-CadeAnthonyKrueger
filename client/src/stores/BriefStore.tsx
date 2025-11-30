import { create } from "zustand";
import type { BriefStore, BriefForm, BackendAircraft } from "../types/BriefFormTypes.tsx";
import { createDefaultStatus } from "../lib/StatusFactory.tsx";

const defaultForm: BriefForm = {
    personnel: [],
    date: undefined,
    aircraftInfo: [],
    pendingRequests: [],
    nicuNotes: undefined,
    scheduledTransportNotes: undefined,
    deviceStatusNotes: undefined,
    otherNotes: undefined,
};

const useBriefStore = create<BriefStore>((set) => ({
    form: defaultForm,

    updateSlice: (key, value) =>
        set((state) => ({
            form: { ...state.form, [key]: value }
        })),

    updateNested: (key, index, value) =>
        set((state) => {
            const arr = state.form[key];

            // Safety check — only handle array fields
            if (!Array.isArray(arr)) {
                console.warn(`updateNested called on non-array key "${String(key)}"`);
                return state;
            }

            const updated = [...arr];
            updated[index] = value;

            return {
                form: {
                    ...state.form,
                    [key]: updated
                }
            };
        }),

    initializeAircraft: (aircraftList: BackendAircraft[]) => set(state => ({
        form: {
            ...state.form,
            aircraftInfo: aircraftList.map(a => ({
                name: a.name,
                location: a.base,
                status: createDefaultStatus("Weather Yellow")
            }))
        }
    })) 

}));

export default useBriefStore;