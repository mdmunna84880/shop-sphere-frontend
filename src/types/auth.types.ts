export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
}