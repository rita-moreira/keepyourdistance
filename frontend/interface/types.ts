export interface StateRegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  message: string;
}

export interface StateLoginFormValues {
  email: string;
  password: string;
  error: string;
  message: string;
}

export interface StateUpdateFormValues {
  username: string;
  email: string;
  description: string;
  country: string;
  error: string;
  message: string;
}
