export interface UserRegisterDTO {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}
export interface UserLoginDTO {
  email: string;
  password: string;
}
export interface UserLoginResponse {
  access_token: string;
  refresh_token: string;
}
export interface GetUserProfileResponse {
  name: string;
  email: string;
  phone_number: string;
}
