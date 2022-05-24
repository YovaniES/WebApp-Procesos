export interface Users {
  username: string;
  password: string;
}

export interface AuthResponse {
  logged: boolean;
  username?: string;
  password?: string;
  token?: string;
  message?: string;
}
