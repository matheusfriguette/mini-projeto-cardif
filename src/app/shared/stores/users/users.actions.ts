import { User } from '../../models/user';

export namespace Users {
  export class List {
    static readonly type = '[Users] List';
    constructor() {}
  }

  export class GetOne {
    static readonly type = '[Users] Get One';
    constructor(public id: number) {}
  }

  export class Register {
    static readonly type = '[Users] Register';
    constructor(public user: User) {}
  }

  export class Update {
    static readonly type = '[Users] Update';
    constructor(public user: User) {}
  }

  export class Delete {
    static readonly type = '[Users] Delete';
    constructor(public id: number) {}
  }
}
