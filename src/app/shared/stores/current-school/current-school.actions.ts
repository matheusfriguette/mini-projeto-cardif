import { School } from "../../models/school";

export namespace CurrentSchool {
  export class Update {
    static readonly type = '[Current School] Update';
    constructor(public school: School) {}
  }
}
