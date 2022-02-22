import { Teacher } from '../../models/teacher';

export namespace Teachers {
  export class List {
    static readonly type = '[Teachers] List';
    constructor() {}
  }

  export class GetOne {
    static readonly type = '[Teachers] Get One';
    constructor(public id: number) {}
  }

  export class Register {
    static readonly type = '[Teachers] Register';
    constructor(public teacher: Teacher) {}
  }

  export class Update {
    static readonly type = '[Teachers] Update';
    constructor(public teacher: Teacher) {}
  }

  export class Delete {
    static readonly type = '[Teachers] Delete';
    constructor(public id: number) {}
  }
}
