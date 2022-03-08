import { School } from '../../models/school';
import { User } from '../../models/user';

export namespace Auth {
  export class UpdateUser {
    static readonly type = '[Auth] Update User';
    constructor(public user: User) {}
  }

  export class UpdateCurrentSchool {
    static readonly type = '[Auth] Update Current School';
    constructor(public school: School) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
    constructor() {}
  }
}
