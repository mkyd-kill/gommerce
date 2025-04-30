export interface AuthResponse {
    token: string;
    refresh: string;
    username: string;
    email: string;
}

export interface UserProfile {
    username: string;
    email: string;
}