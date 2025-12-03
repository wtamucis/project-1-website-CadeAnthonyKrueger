export type UserRole =
    | "comspec"
    | "team_lead"
    | "supervisor"
    | "director";

export interface User {
    id: number;
    name: string;
    role: UserRole;
    permissions: string[];
}

export interface UserStore {
    users: User[];
    isLoading: boolean;
    error: string | null;

    userMap: { [key: number]: User };

    // Only setters — axios will call these
    setUsers: (users: User[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (message: string | null) => void;

    // Getters
    getUserById: (id: number) => User | undefined;
    getUserName: (id: number) => string;
    getUserNames: (ids: number[]) => string[];
    getUsersByRole: (role: UserRole) => User[];
    getPermissions: (id: number) => string[];
}