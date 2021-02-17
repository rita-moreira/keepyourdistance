export interface CompleteTaskUser {
  _id: string;
  username: string;
  salt: string;
  role: number;
  progress: number;
  photo: string;
  hashed_password: string;
  email: string;
  description: string;
  country: string;
}
