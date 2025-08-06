export interface User {
  id: number;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  address: string;
  state: string;
  dateOfBirth: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegistrationData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
  address: string;
  state: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}