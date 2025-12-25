// Input data for the Login Form
// Matches the Fake Store API requirement for 'username'
export interface LoginInput {
  username: string;
  password: string;
}

// The response received from the Fake Store API upon successful login
export interface AuthResponse {
  token: string;
}

// The shape of the Redux Slice state for Authentication
export interface AuthState {
  user: string | null;      // To store the current username after login
  token: string | null;     // To store the JWT token (persisted in localStorage)
  isAuthenticated: boolean; // Helper flag to manage protected routes or UI changes
  loading: boolean;         // To disable the button while the API request is processing
  error: string | null;     // To display validation errors or "Invalid credentials"
}