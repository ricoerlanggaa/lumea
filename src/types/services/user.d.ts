export interface UserRegister {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface UserAuthToken {
  access_token: string;
  refresh_token: string;
}
