export interface UserState {
  isLoading: boolean;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface UserRegister {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
