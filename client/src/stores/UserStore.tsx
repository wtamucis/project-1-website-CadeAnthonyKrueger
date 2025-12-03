import { create } from "zustand";
import type { User, UserRole, UserStore } from "../types/UserTypes";

// =============================
// LOCAL SEED DATA (temporary)
// Replace with real backend data later
// =============================

const seedUserData: User[] = [
    { id: 1,  name: "Rhyski Witness",      role: "team_lead",   permissions: ["view_briefs", "edit_briefs"] },
    { id: 2,  name: "Cade Krueger",        role: "comspec",     permissions: ["view_briefs", "edit_briefs"] },
    { id: 3,  name: "Zeadyn Wall",         role: "comspec",     permissions: ["view_briefs", "edit_briefs"] },
    { id: 4,  name: "Jamie Gatlin",        role: "comspec",     permissions: ["view_briefs", "edit_briefs"] },
    { id: 5,  name: "Alyssa Spring",       role: "comspec",     permissions: ["view_briefs", "edit_briefs"] },
    { id: 6,  name: "Sabrina Frederick",   role: "team_lead",   permissions: ["view_briefs", "edit_briefs"] },
    { id: 7,  name: "Jose Gonzales",       role: "supervisor",  permissions: ["view_briefs", "edit_briefs", "manage_users"] },
    { id: 8,  name: "Candice Wheeler",     role: "team_lead",   permissions: ["view_briefs", "edit_briefs"] },
    { id: 9,  name: "Jessica Andrews",     role: "comspec",     permissions: ["view_briefs", "edit_briefs"] },
    { id: 10, name: "Matt McCall",         role: "comspec",     permissions: ["view_briefs", "edit_briefs"] },
    { id: 11, name: "Katt Matuza",         role: "comspec",     permissions: ["view_briefs", "edit_briefs"] },
    { id: 12, name: "Chelsi Bradfute",     role: "director",    permissions: ["view_briefs", "edit_briefs", "manage_users", "admin_tools", "view_metrics"] },
];

// =============================
// ZUSTAND STORE (NO FETCH LOGIC)
// =============================

export const useUserStore = create<UserStore>((set, get) => ({
    users: seedUserData,     // temporary — replace later

    // ⭐ NEW: initial userMap
    userMap: Object.fromEntries(seedUserData.map(u => [u.id, u])),

    isLoading: false,
    error: null,

    // Axios-driven updates
    setUsers: (users) =>
        set({
            users,

            // ⭐ NEW: regenerate userMap when users change
            userMap: Object.fromEntries(users.map(u => [u.id, u]))
        }),

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (message) => set({ error: message }),

    // =============================
    // GETTERS
    // =============================

    getUserById: (id: number) => {
        return get().userMap[id];   // ⭐ updated to use userMap (faster)
    },

    getUserName: (id: number) => {
        return get().userMap[id]?.name ?? "Unknown User";  // ⭐ map lookup
    },

    getUserNames: (ids: number[]) => {
        const userNames: string[] = [];
        ids.forEach((id) => { userNames.push(get().userMap[id]?.name ?? "Unknown User") });
        return userNames;
    },

    getUsersByRole: (role: UserRole) => {
        return get().users.filter(u => u.role === role);
    },

    getPermissions: (id: number) => {
        return get().userMap[id]?.permissions ?? [];   // ⭐ map lookup
    },
}));