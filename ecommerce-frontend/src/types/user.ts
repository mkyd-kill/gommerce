export interface AuthResponse {
    token: string;
    refresh: string;
    user_id: string;
    username: string;
    email: string;
}

export interface UserProfile {
    user_id: string;
    username: string;
    email: string;
}