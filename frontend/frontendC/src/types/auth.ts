export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    role: 'coach' | 'admin' | 'learner';
    fullname: string;
    phoneNumber: string;
  };
}
