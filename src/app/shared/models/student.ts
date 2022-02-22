import { Grade } from "./grade";

export interface Student {
  id?: number;
  name: string;
  email: string;
  birthday: string;
  grade: Grade;
}
