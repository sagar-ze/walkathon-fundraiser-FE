import { RegisterSchema } from '../services/userService';

export type UserDetail = RegisterSchema & {
  id: number;
};

export type AuthResponse = { jwt: string; user: UserDetail };
