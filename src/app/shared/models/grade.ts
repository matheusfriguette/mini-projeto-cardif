import { Subject } from "./subject";

export interface Grade {
  id?: number;
  name: string;
  subjects: Subject[];
}
