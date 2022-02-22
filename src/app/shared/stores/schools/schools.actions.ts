import { School } from '../../models/school';

export namespace Schools {
  export class List {
    static readonly type = '[Schools] List';
    constructor() {}
  }

  export class GetOne {
    static readonly type = '[Schools] Get One';
    constructor(public id: number) {}
  }

  export class Register {
    static readonly type = '[Schools] Register';
    constructor(public school: School) {}
  }

  export class Update {
    static readonly type = '[Schools] Update';
    constructor(public school: School) {}
  }

  export class Delete {
    static readonly type = '[Schools] Delete';
    constructor(public id: number) {}
  }
}
