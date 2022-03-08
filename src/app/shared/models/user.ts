export interface User {
  id?: number;
  user: string;
  password: string;
  role: Role;
  defaultSchool?: number;
}

export type Role = 'admin' | 'common';
